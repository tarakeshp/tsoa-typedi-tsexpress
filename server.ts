import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import app from './src/app';

const PORT = process.env.PORT || 8080;

async function bootstrap() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

bootstrap();