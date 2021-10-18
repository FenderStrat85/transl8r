// @ts-nocheck
/// <reference types="react-scripts" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_SERVER_URL: string;
      REACT_APP_STRIPE_SECRET_KEY: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {};
