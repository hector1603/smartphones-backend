import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Smartphone } from './smarthphones/entities/smartphone.entity';
import { SmartphonesController } from './smarthphones/smartphones.controller';
import { SmartphonesService } from './smarthphones/smartphones.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    SmartphonesModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [SmartphonesController],
  providers: [SmartphonesService],
})
export class AppModule {}
