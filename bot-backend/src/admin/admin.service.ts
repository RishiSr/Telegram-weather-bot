
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Keys } from './keys.schema';

@Injectable()
export class AdminService {
  private apiKey = '3afaf6d8497970c3796e7353691b1f4a'; // Initial API Keys
  private users: string[] = []; // Store user data here
  constructor(@InjectModel(Keys.name) private keyModel: Model<Keys>) {}

  async getApiKey(): Promise<Keys> {
    return this.keyModel.findOne({active:true});
  }

  
  async updateKey(id:string,keyValue:string):Promise<Keys>{
    const Keys=this.keyModel.findByIdAndUpdate(id,{key:keyValue})
    return Keys;
  }
}