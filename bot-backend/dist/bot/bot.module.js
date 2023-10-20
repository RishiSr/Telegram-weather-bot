"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotModule = void 0;
const common_1 = require("@nestjs/common");
const bot_service_1 = require("./bot.service");
const admin_service_1 = require("../admin/admin.service");
const users_service_1 = require("../users/users.service");
const mongoose_1 = require("@nestjs/mongoose");
const keys_schema_1 = require("../admin/keys.schema");
const users_schema_1 = require("../users/users.schema");
const config_1 = require("@nestjs/config");
let BotModule = class BotModule {
};
exports.BotModule = BotModule;
exports.BotModule = BotModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true
            }),
            mongoose_1.MongooseModule.forFeature([{ name: keys_schema_1.Keys.name, schema: keys_schema_1.KeySchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: users_schema_1.User.name, schema: users_schema_1.UserSchema }]),
        ],
        providers: [bot_service_1.BotService, admin_service_1.AdminService, users_service_1.UsersService]
    })
], BotModule);
//# sourceMappingURL=bot.module.js.map