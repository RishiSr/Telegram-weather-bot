import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { dbProviders } from './db.providers';

@Module({
    imports: [MongooseModule.forRoot(process.env.DB_CONN_STRING)],
    providers: [...dbProviders],
    exports: [MongooseModule], 
  })
export class DbModule {}
