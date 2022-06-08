import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DTOQueryUser {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  readonly name?: string;
  @IsString()
  @IsNotEmpty()
  readonly lastName?: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  readonly email?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  readonly phone?: string;

  @IsString()
  @IsNotEmpty()
  accessToken?: string;

  @IsString()
  @IsNotEmpty()
  refreshToken?: string;
}
