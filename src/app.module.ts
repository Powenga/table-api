import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config, { IDatabaseConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (
        configService: ConfigService<{ database: IDatabaseConfig }, true>,
      ) => {
        const { host, port, name, user, password } = configService.get(
          'database',
          { infer: true },
        );
        return {
          type: 'postgres',
          host: host,
          port: port,
          database: name,
          username: user,
          password: password,
          entities: [],
          // TODO: change it
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
