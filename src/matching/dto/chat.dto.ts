import {
  IsArray,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class DTOCreateChat {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  @IsMongoId()
  users: string[];
}
