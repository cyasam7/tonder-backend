import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class DTOCreateUser {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  readonly lastName: string;
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  /* @IsPhoneNumber() */
  @ApiProperty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  readonly password: string;

  @IsString()
  @ApiProperty()
  readonly photo?: string;
}

export class DTOUpdateUser extends PartialType(DTOCreateUser) {}
