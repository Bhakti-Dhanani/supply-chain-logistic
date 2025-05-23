import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const databaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'chainpluse',
  autoLoadEntities: true,
  synchronize: true, // Disable in production
});

export default databaseConfig;
