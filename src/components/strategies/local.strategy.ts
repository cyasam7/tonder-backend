import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/auth/schema/user.schema';
import { ValidateUser } from 'src/auth/useCase/validateUser';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private validateUser: ValidateUser) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }
  async validate(username: string, password: string): Promise<User> {
    console.log(username);
    const user = await this.validateUser.execute(username, password);
    if (!user) throw new UnauthorizedException('Usuario no valido');
    return user;
  }
}
