
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Keys extends Document {
 
  @Prop({ required: true })
  key: string;

  @Prop({required:true})
  active:boolean;


}

export const KeySchema = SchemaFactory.createForClass(Keys);