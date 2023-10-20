import { Provider } from '@nestjs/common';
import * as mongoose from 'mongoose';

export const dbProviders: Provider[] = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      try {
       
        // const uri = process.env.;

    
        const connection = await mongoose.connect("mongodb+srv://rishisr4409:telebotrishi-8989@cluster0.wyc9cxv.mongodb.net/?retryWrites=true&w=majority");

        return connection;
      } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
      }
    },
  },
];