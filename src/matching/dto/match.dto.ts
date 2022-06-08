import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class DTOCreateMatch {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  @IsMongoId()
  @ApiProperty()
  users: string[];
}
