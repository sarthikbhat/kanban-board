declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_URI: string;
            PORT: number;
            TOKEN_KEY: string;
        }
    }
}

export {};