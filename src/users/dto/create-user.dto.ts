import {
  IsString,
  IsNotEmpty,
  IsEmail,
  ValidateIf,
  IsPhoneNumber,
  IsDefined,
  MaxLength,
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

  @IsDefined()
  @ValidateIf(({ phoneNumber }) => phoneNumber !== '')
  @IsPhoneNumber()
  phoneNumber: string;

  @IsDefined()
  @ValidateIf(({ mobileNumber }) => mobileNumber !== '')
  @IsPhoneNumber()
  mobileNumber: string;

  @IsDefined()
  @ValidateIf(({ email }) => email !== '')
  @IsEmail()
  email: string;

  @IsDefined()
  @ValidateIf(({ address }) => address !== '')
  @IsString()
  @MaxLength(MAX_USER_ADDRESS_LENGHT)
  address: string;
}
