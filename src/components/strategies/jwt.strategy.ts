import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { User, UserDocument } from 'src/auth/schema/user.schema';
import { IPayloadToken } from 'src/auth/services/auth.service';
import { IEnvConfig } from 'src/config';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService<IEnvConfig>,
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET_WORD'),
    });
  }

  async validate(payload: IPayloadToken): Promise<UserDocument> {
    const user = await this.userRepository.findById(payload.sub);
    if (!user) throw new UnauthorizedException('No existe usuario con ese id');
    return user;
  }
}
