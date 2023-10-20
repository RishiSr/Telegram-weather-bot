import { Model } from 'mongoose';
import { Keys } from './keys.schema';
export declare class AdminService {
    private keyModel;
    private apiKey;
    private users;
    constructor(keyModel: Model<Keys>);
    getApiKey(): Promise<Keys>;
    updateKey(id: string, keyValue: string): Promise<Keys>;
}
