import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Keys } from './keys.schema';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('api-key')
  async getApiKey():Promise<Keys> {
 return this.adminService.getApiKey();

  }

 
  @Patch('api-key')
  async updateKey(@Body('id') id:string, @Body('value') keyValue:string ):Promise<Keys> {
    return this.adminService.updateKey(id,keyValue)

  }




  // @Get('users')
  // getUsers() {
  //   return this.adminService.getUsers();
  // }
}