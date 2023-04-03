import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Address } from './entities/address.entity';
import { Billing } from './entities/billing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Address, Billing])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
