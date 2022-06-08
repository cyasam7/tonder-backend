import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class DTOQueryRefreshToken {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  refreshToken: string;
}
