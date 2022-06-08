import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class DTOQueryRequest {
  @IsString()
  @IsMongoId()
  @ApiProperty()
  user: string;

  @IsString()
  @IsMongoId()
  @ApiProperty()
  userRequesed: string;
}
