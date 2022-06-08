import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { config, IEnvConfig } from 'src/config';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { User, UserSchema } from './schema/user.schema';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { UserMapper } from './mappers/user.mapper';
import { LocalStrategy } from 'src/components/strategies/local.strategy';
import { JWTStrategy } from 'src/components/strategies/jwt.strategy';
import { ValidateUser } from './useCase/validateUser';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: async (config: IEnvConfig) => {
        return {
          secret: config.SECRET_WORD,
          signOptions: { expiresIn: config.EXPIRATION_TIME },
        };
      },
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [
    UserRepository,
    AuthService,
    UserService,
    LocalStrategy,
    JWTStrategy,
    UserMapper,
    ValidateUser,
  ],
  exports: [UserRepository, UserMapper],
})
export class AuthModule {}
