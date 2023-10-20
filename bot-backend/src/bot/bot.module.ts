import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { AdminService } from 'src/admin/admin.service';
import { AdminController } from 'src/admin/admin.controller';
import { UsersService } from 'src/users/users.service';
import { AdminModule } from 'src/admin/admin.module';
import { UserModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { KeySchema, Keys } from 'src/admin/keys.schema';
import { User, UserSchema } from 'src/users/users.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forFeature([{ name: Keys.name, schema: KeySchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
 
  providers: [BotService,AdminService,UsersService]
})
export class BotModule {}
