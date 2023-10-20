import { Injectable,Logger } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { UsersService } from 'src/users/users.service';
const TelegramBot = require('node-telegram-bot-api');
import * as cron from 'node-cron';

@Injectable()
export class BotService {
     chatID:any="5497804153";
     userID:any="5497804153";
     users:any;
    private readonly bot:any;
constructor(private readonly adminService:AdminService,private readonly userServive:UsersService){
    this. bot = new TelegramBot(process.env.TELEGRAM_API_KEY, {polling: true});
  

    this.Register();
    
      this.bot.onText(/\/city (.+)/, async(msg,match)=>{
        const chatId = msg.chat.id;
        const first_name = msg.from.first_name
        const city = match[1]
        this.bot.sendMessage(chatId, city);
        this.sendWeatherUpdate(chatId,city)

        // this.bot.sendMessage(chatId,msg)
        
  
      })


      cron.schedule('00 9 * * *', () => {
        console.log("sending update");
           
      this.getAll();
   
    });
    // this.getAll();
}

private async  getAll(){
try{

  this.users=await this.userServive.getUsers();
//  Logger.log(this.users)
// console.log(this.users)

for(let i =0;i<this.users.length;i++){
  this.sendWeatherUpdate(this.users[i].chatId,this.users[i].city);
}
}catch(err){
  Logger.error(err);
}

}
private Register() {

    this.bot.onText(/\/start/, async(msg)=>{
      const chatId = msg.chat.id;
      const first_name = msg.from.first_name

      this.bot.sendMessage(chatId, `Hi ${first_name}, welcome to the weather bot, Checkout the following commands\n
    /subscribe <city name> : To subscribe the daily weather forcast  at 9 am everyday.
    eg: /subscribe delhi
    /unsubscribe : To unsubscribe to the service.
    eg: /unsubscribe
    /city <cityname> :  To get weather information for the entered city.
    eg: /city indore
    for help : /help`)
      

    })
    this.bot.onText(/\/help/, async(msg)=>{
      const chatId = msg.chat.id;
      const first_name = msg.from.first_name

      this.bot.sendMessage(chatId, `Hi ${first_name}, welcome to the weather bot, Checkout the following commands\n
    /subscribe <city name> : To subscribe the daily weather forcast  at 9 am everyday.
    eg: /subscribe delhi
    /unsubscribe : To unsubscribe to the service.
    eg: /unsubscribe
    /city <cityname> :  To get weather information for the entered city.
    eg: /city indore
    for help : /help`)
      

    })
    this.bot.onText(/\/subscribe (.+)/, async(msg:any,match:any)=>{
        const chatId = msg.chat.id;
        const first_name = msg.from.first_name
        Logger.log(match)
const city=match[1];

try{
  let res=await this.userServive.add(chatId,city,first_name);
 
  console.log(res)
  this.bot.sendMessage(chatId, `Subscribed..`)
}catch(err){
  Logger.error({...err});

  if(err.code==11000){
    this.bot.sendMessage(chatId, `Already Subscribed..`)
  }else{
    this.bot.sendMessage(chatId,"Something went wrong, Try Again the previous command");
  }

  
} 
  
        
  
      })
      this.bot.onText(/\/unsubscribe/, async(msg)=>{
        const chatId = msg.chat.id;
        const first_name = msg.from.first_name
  
try{
  let res=await this.userServive.delete(chatId);
 if(!res){
  this.bot.sendMessage(chatId, `Already Unsubscribed`);
 }else{

   this.bot.sendMessage(chatId, `Unsubscribed..`)
 }
}catch(err){
  Logger.error({...err});

 
    this.bot.sendMessage(chatId,"Something went wrong, Try Again the previous command");
  

  
} 
        
  
      })
}

private async sendWeatherUpdate(chatId: number,city:string) {

    // const apiKey = this.adminService.getApiKey();
    // const apiKey="19ab12df7eb08d12a1473fed2da16550"

   
// return
    try {
      const apiKeydoc=await this.adminService.getApiKey();
      const apiKey=apiKeydoc.key;
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
      );

      if (!response.ok) {
        Logger.error('Failed to fetch weather data');
        return;
      }

      const data: any = (await response.json()) ;

      const weatherDescription = data.weather[0]?.description;
      const temperature = (data.main?.temp - 273.15)?.toFixed(2); // Convert to Celsius
console.log(data)
//   Min Temp: ${(data.main?.temp_min - 273.15)?.toFixed(2)}°C\n
      const message = `
     \t Weather Bot By Rishi\n
      City -- ${city}\n
      Current Temp: ${(data.main?.temp - 273.15)?.toFixed(2)}°C\n
      Max Temp: ${(data.main?.temp_max - 273.15)?.toFixed(2)}°C\n    
      Weather Condition: ${data.weather[0]?.description}\n
      
      `;

      this.bot.sendMessage(chatId, message);
    } catch (error) {
      Logger.error('Error fetching weather data', error);
    }
  }

}
