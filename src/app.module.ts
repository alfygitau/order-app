import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './entities/User';
import { Profile } from './entities/Profile';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { OrderType } from './entities/Order-type';
import { OrderTypeModule } from './order-type/order-type.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'new_password',
      database: 'order_app',
      entities: [User, Profile, OrderType],
      synchronize: true,
    }),
    UsersModule,
    ProfileModule,
    AuthModule,
    OrderTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
