"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbProviders = void 0;
const mongoose = require("mongoose");
exports.dbProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
            try {
                const connection = await mongoose.connect("mongodb+srv://rishisr4409:telebotrishi-8989@cluster0.wyc9cxv.mongodb.net/?retryWrites=true&w=majority");
                return connection;
            }
            catch (error) {
                console.error('MongoDB connection error:', error);
                throw error;
            }
        },
    },
];
//# sourceMappingURL=db.providers.js.map