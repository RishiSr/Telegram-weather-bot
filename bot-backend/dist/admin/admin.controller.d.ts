import { AdminService } from './admin.service';
import { Keys } from './keys.schema';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getApiKey(): Promise<Keys>;
    updateKey(id: string, keyValue: string): Promise<Keys>;
}
