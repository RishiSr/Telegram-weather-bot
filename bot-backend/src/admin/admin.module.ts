import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KeySchema, Keys } from './keys.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Keys.name, schema: KeySchema }]),
      ],
  controllers: [AdminController],
  providers: [AdminService],
  exports:[AdminService]
})
export class AdminModule {}