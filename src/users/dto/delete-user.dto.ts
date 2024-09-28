import { ArrayNotEmpty, IsArray, IsUUID } from 'class-validator';

export class DeleteUsersDTO {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  idList: string[];
}
