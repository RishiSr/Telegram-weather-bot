import { User } from './users.schema';
import { Model } from 'mongoose';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    add(chatId: string, city: string, username: string): Promise<User>;
    delete(chatId: string): Promise<User | null>;
    getUsers(): Promise<User[]>;
    getAllUsers(): Promise<User[]>;
    updateStatus(id: string, status: boolean): Promise<User[]>;
    getUserByChatId(chatId: number): Promise<User | null>;
}
