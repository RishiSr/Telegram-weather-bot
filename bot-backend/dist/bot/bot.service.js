"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("../admin/admin.service");
const users_service_1 = require("../users/users.service");
const TelegramBot = require('node-telegram-bot-api');
const cron = require("node-cron");
let BotService = class BotService {
    constructor(adminService, userServive) {
        this.adminService = adminService;
        this.userServive = userServive;
        this.chatID = "5497804153";
        this.userID = "5497804153";
        this.bot = new TelegramBot(process.env.TELEGRAM_API_KEY, { polling: true });
        this.Register();
        this.bot.onText(/\/city (.+)/, async (msg, match) => {
            const chatId = msg.chat.id;
            const first_name = msg.from.first_name;
            const city = match[1];
            this.bot.sendMessage(chatId, city);
            this.sendWeatherUpdate(chatId, city);
        });
        cron.schedule('54 19 * * *', () => {
            console.log("sending update");
            this.getAll();
        });
    }
    async getAll() {
        try {
            this.users = await this.userServive.getUsers();
            for (let i = 0; i < this.users.length; i++) {
                this.sendWeatherUpdate(this.users[i].chatId, this.users[i].city);
            }
        }
        catch (err) {
            common_1.Logger.error(err);
        }
    }
    Register() {
        this.bot.onText(/\/start/, async (msg) => {
            const chatId = msg.chat.id;
            const first_name = msg.from.first_name;
            this.bot.sendMessage(chatId, `Hi ${first_name}, welcome to the weather bot, Checkout the following commands\n
    /subscribe <city name> : To subscribe the daily weather forcast  at 9 am everyday.
    eg: /subscribe delhi
    /unsubscribe : To unsubscribe to the service.
    eg: /unsubscribe
    /city <cityname> :  To get weather information for the entered city.
    eg: /city indore
    for help : /help`);
        });
        this.bot.onText(/\/help/, async (msg) => {
            const chatId = msg.chat.id;
            const first_name = msg.from.first_name;
            this.bot.sendMessage(chatId, `Hi ${first_name}, welcome to the weather bot, Checkout the following commands\n
    /subscribe <city name> : To subscribe the daily weather forcast  at 9 am everyday.
    eg: /subscribe delhi
    /unsubscribe : To unsubscribe to the service.
    eg: /unsubscribe
    /city <cityname> :  To get weather information for the entered city.
    eg: /city indore
    for help : /help`);
        });
        this.bot.onText(/\/subscribe (.+)/, async (msg, match) => {
            const chatId = msg.chat.id;
            const first_name = msg.from.first_name;
            common_1.Logger.log(match);
            const city = match[1];
            try {
                let res = await this.userServive.add(chatId, city, first_name);
                console.log(res);
                this.bot.sendMessage(chatId, `Subscribed..`);
            }
            catch (err) {
                common_1.Logger.error({ ...err });
                if (err.code == 11000) {
                    this.bot.sendMessage(chatId, `Already Subscribed..`);
                }
                else {
                    this.bot.sendMessage(chatId, "Something went wrong, Try Again the previous command");
                }
            }
        });
        this.bot.onText(/\/unsubscribe/, async (msg) => {
            const chatId = msg.chat.id;
            const first_name = msg.from.first_name;
            try {
                let res = await this.userServive.delete(chatId);
                if (!res) {
                    this.bot.sendMessage(chatId, `Already Unsubscribed`);
                }
                else {
                    this.bot.sendMessage(chatId, `Unsubscribed..`);
                }
            }
            catch (err) {
                common_1.Logger.error({ ...err });
                this.bot.sendMessage(chatId, "Something went wrong, Try Again the previous command");
            }
        });
    }
    async sendWeatherUpdate(chatId, city) {
        try {
            const apiKeydoc = await this.adminService.getApiKey();
            const apiKey = apiKeydoc.key;
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            if (!response.ok) {
                common_1.Logger.error('Failed to fetch weather data');
                return;
            }
            const data = (await response.json());
            const weatherDescription = data.weather[0]?.description;
            const temperature = (data.main?.temp - 273.15)?.toFixed(2);
            console.log(data);
            const message = `
     \t Weather Bot By Rishi\n
      City -- ${city}\n
      Current Temp: ${(data.main?.temp - 273.15)?.toFixed(2)}°C\n
      Max Temp: ${(data.main?.temp_max - 273.15)?.toFixed(2)}°C\n    
      Weather Condition: ${data.weather[0]?.description}\n
      
      `;
            this.bot.sendMessage(chatId, message);
        }
        catch (error) {
            common_1.Logger.error('Error fetching weather data', error);
        }
    }
};
exports.BotService = BotService;
exports.BotService = BotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_service_1.AdminService, users_service_1.UsersService])
], BotService);
//# sourceMappingURL=bot.service.js.map