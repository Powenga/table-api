import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  MaxLength,
  IsOptional,
} from 'class-validator';

const MAX_USER_NAME_LENGHT = 200;
const MAX_USER_ADDRESS_LENGHT = 2000;

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_USER_NAME_LENGHT)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_USER_NAME_LENGHT)
  lastName: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsOptional()
  @IsPhoneNumber()
  mobileNumber: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(MAX_USER_ADDRESS_LENGHT)
  address: string;
}
