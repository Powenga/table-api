import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUsersDTO } from './dto/delete-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete()
  remove(@Body() deleteUserDto: DeleteUsersDTO) {
    return this.usersService.delete(deleteUserDto.idList);
  }

  @Post('fillAll')
  fillUsers(@Body() fillDto: { count: number }) {
    return this.usersService.fillUsers(fillDto.count);
  }
}
