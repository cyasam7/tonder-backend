import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { enviroments, isDev } from './enviroments';
import { AuthModule } from './auth/auth.module';
import { config, IEnvConfig, joiSchemaEnv } from './config';
import { MatchingModule } from './matching/matching.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        enviroments[process.env.NODE_ENV] || ('.env.development' as string),
      isGlobal: true,
      load: [config],
      validationSchema: joiSchemaEnv,
    }),
    MongooseModule.forRootAsync({
      inject: [config.KEY],
      useFactory: async (config: IEnvConfig) => {
        return {
          uri: isDev
            ? `mongodb://${config.MONGO_HOST}:27017/${config.MONGO_DB_NAME}`
            : `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_HOST}/${config.MONGO_DB_NAME}`,
        };
      },
    }),
    AuthModule,
    MatchingModule,
  ],
  providers: [AuthModule],
})
export class AppModule {}
