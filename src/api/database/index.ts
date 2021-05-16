import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';
import config from '../../api/build/config';

export function connectDatabase(): void {

    if(process.env.NODE_ENV === 'test')
    {
        const mockgoose = new Mockgoose(mongoose);
        mockgoose.prepareStorage().then(function() {
            mongoose.connect(config.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
                .then(() => console.log("✔️  Connected to Mongodb."))
                .catch((error: any) => { throw new Error(`Failed to connect to test Mongodb 💔 ${error}`); } );
        });
    }
    else
    {
        mongoose.connect(config.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log("✔️ Connected to Mongodb."))
            .catch((error: any) => { throw new Error(`Failed to connect to Mongodb 💔 ${error}`); } );
    }
    
    
}

export async function dropDatabase(): Promise<void>
{
    return await mongoose.connection.db.dropDatabase();
}

export async function closeDatabase(): Promise<void>
{
    return await mongoose.disconnect();
}

