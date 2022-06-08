import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class DTOCreateRequest {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  user: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  userRequesed: string;
}
