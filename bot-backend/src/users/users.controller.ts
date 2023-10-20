import { Body, Controller, Delete, Get, NotFoundException, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';

@Controller('users')
export class UsersController {
constructor(private readonly userService:UsersService){}
@Get()
async getUsers(): Promise<User[]> {
  return this.userService.getUsers();
}
@Get('all')
async getAllUsers(): Promise<User[]> {
  return this.userService.getAllUsers();
}


@Delete(':id')
async deleteUser(@Param('id') chatId: string) {
  const deletedUser = await this.userService.delete(chatId);
  if (deletedUser) {
    return { message: 'User deleted successfully' };
  } else {
    return {message:"Something went wrong"};
  }
}

@Patch()
async update(@Body('id') id:string,@Body('status') status:boolean): Promise<User[]>{
  return this.userService.updateStatus(id,status);
}
    


}
