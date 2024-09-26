import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

const RANDOM_USERS_URL = 'http://api.randomdatatools.ru';
const MAX_USERS_PER_REQUEST = 100;
const RANDOM_USERS_REQUEST_PARAMS = {
  unescaped: false,
  params: 'LastName,FirstName,Phone,Email,Address',
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private httpService: HttpService,
    private dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find({
      order: {
        lastName: 'asc',
      },
    });
  }

  findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
  }

  private getRandomUsers(numberOfUsers: number) {
    const quotient = Math.floor(numberOfUsers / MAX_USERS_PER_REQUEST);
    const remainder = numberOfUsers % MAX_USERS_PER_REQUEST;

    const requests = Array<number>(quotient).fill(MAX_USERS_PER_REQUEST);

    if (remainder) {
      requests.push(remainder);
    }

    return Promise.all(
      requests.map((numberOfUsers) => {
        return lastValueFrom(
          this.httpService
            .get<
              {
                LastName: string;
                FirstName: string;
                Phone: string;
                Email: string;
                Address: string;
              }[]
            >(RANDOM_USERS_URL, {
              params: {
                count: numberOfUsers,
                ...RANDOM_USERS_REQUEST_PARAMS,
              },
            })
            .pipe(
              map((res) =>
                res.data.map((user) => ({
                  firstName: user.FirstName,
                  lastName: user.LastName,
                  phoneNumber: user.Phone,
                  mobileNumber: user.Phone,
                  email: user.Email,
                  address: user.Address,
                })),
              ),
            ),
        );
      }),
    ).then((responses) => responses.flat());
  }

  async fillUsers(count: number) {
    const users = await this.getRandomUsers(count);
    await this.usersRepository.insert(users);
    return `${users.length} users have been inserted`;
  }
}
