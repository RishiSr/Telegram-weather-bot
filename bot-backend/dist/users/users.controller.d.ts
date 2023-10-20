import { UsersService } from './users.service';
import { User } from './users.schema';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    getUsers(): Promise<User[]>;
    getAllUsers(): Promise<User[]>;
    deleteUser(chatId: string): Promise<{
        message: string;
    }>;
    update(id: string, status: boolean): Promise<User[]>;
}
