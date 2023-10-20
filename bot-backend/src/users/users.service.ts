import { Injectable } from '@nestjs/common';
import { User } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
      constructor(@InjectModel(User.name) private userModel: Model<User>) {}

   
  async add(chatId: string, city: string,username:string): Promise<User> {   
    
    const user = new this.userModel({ chatId, username,city });
    return  await user.save();
  }

  async delete(chatId: string): Promise<User | null> {
    return this.userModel.findOneAndDelete({ chatId }).exec();
  }

  async getUsers(): Promise<User[]> {
    return this.userModel.find({active:true}).exec();
  }
  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async updateStatus(id:string,status:boolean):Promise<User[]>{
    return this.userModel.findByIdAndUpdate(id,{active:status})
  }

  async getUserByChatId(chatId: number): Promise<User | null> {
    return this.userModel.findOne({ chatId }).exec();
  }
}
