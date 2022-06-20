import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class DTOCreateMessage {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  match: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  user: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  message: string;
}
export class DTOQueryMessage {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  match?: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  user?: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  message?: string;
}
