import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsString } from 'class-validator';

export class DTOQueryRequest {
  @IsString()
  @IsMongoId()
  @ApiProperty()
  user: string;

  @IsString()
  @IsMongoId()
  @ApiProperty()
  userRequesed: string;

  @IsBoolean()
  sent: boolean;
}
