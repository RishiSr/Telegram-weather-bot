import { AdminService } from 'src/admin/admin.service';
import { UsersService } from 'src/users/users.service';
export declare class BotService {
    private readonly adminService;
    private readonly userServive;
    chatID: any;
    userID: any;
    users: any;
    private readonly bot;
    constructor(adminService: AdminService, userServive: UsersService);
    private getAll;
    private Register;
    private sendWeatherUpdate;
}
