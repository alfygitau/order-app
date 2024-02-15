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
import { OrderCategory } from './entities/Order-category';
import { OrderCategoryModule } from './order-category/order-category.module';
import { Pages } from './entities/Pages';
import { PagesModule } from './pages/pages.module';
import { Style } from './entities/Style';
import { StylesModule } from './styles/styles.module';
import { AcademicLevel } from './entities/Academic-level';
import { AcademicLevelModule } from './academic-level/academic-level.module';
import { Urgency } from './entities/Urgency';
import { UrgencyModule } from './urgency/urgency.module';
import { Subject } from './entities/Subject';
import { SubjectModule } from './subject/subject.module';
import { Reference } from './entities/References';
import { ReferencesModule } from './references/references.module';
import { OrderFile } from './entities/Order-files';
import { Order } from './entities/Order';
import { OrderMessage } from './entities/Order-message';
import { OrderFilesModule } from './order-files/order-files.module';
import { OrderMessageModule } from './order-message/order-message.module';
import { OrderModule } from './order/order.module';
import { RevisionFile } from './entities/Revision-files';
import { RevisionFilesModule } from './revision-files/revision-files.module';
import { OrderRevision } from './entities/Order-revision';
import { OrderRevisionModule } from './order-revision/order-revision.module';
import { Rating } from './entities/Rating';
import { CompletedOrderFile } from './entities/Completed-order-files';
import { PaypalModule } from './paypal/paypal.module';

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
      entities: [
        User,
        Profile,
        OrderType,
        OrderCategory,
        Pages,
        Style,
        AcademicLevel,
        Urgency,
        Subject,
        Reference,
        OrderFile,
        Order,
        OrderMessage,
        RevisionFile,
        OrderRevision,
        Rating,
        CompletedOrderFile,
      ],
      logging: true,
      synchronize: true,
    }),
    UsersModule,
    ProfileModule,
    AuthModule,
    OrderTypeModule,
    OrderCategoryModule,
    PagesModule,
    StylesModule,
    AcademicLevelModule,
    UrgencyModule,
    SubjectModule,
    ReferencesModule,
    OrderFilesModule,
    OrderMessageModule,
    OrderModule,
    RevisionFilesModule,
    OrderRevisionModule,
    PaypalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
