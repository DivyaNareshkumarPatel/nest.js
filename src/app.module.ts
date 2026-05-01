import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';

@Module({
  imports: [UsersModule,
    DatabaseModule,
    EmployeesModule,
    ThrottlerModule.forRoot([{ name: 'short', ttl: 1000, limit: 3 }, { name: 'long', ttl: 60000, limit: 100 }]),
    MyLoggerModule,
    AuthModule,
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => {
        const redisUrl = `redis://${process.env.REDIS_HOST || '172.17.0.2'}:${process.env.REDIS_PORT || '6379'}`;
        return {
          stores: [new KeyvRedis(redisUrl)],
          ttl: 0
        };
      }
    })],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule { }
