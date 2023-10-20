
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true,unique:true })
  chatId: number;

  @Prop({ required: true })
  username: string;

  @Prop({required:true})
  city:string;
  @Prop({default:true})
  active:boolean

  // Add any other fields you need

}

export const UserSchema = SchemaFactory.createForClass(User);