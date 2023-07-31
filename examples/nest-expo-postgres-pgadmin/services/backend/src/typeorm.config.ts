// typeorm.config.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const postgresConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PGHOST || 'localhost',
  port: parseInt(process.env.PGPORT, 10) || 5432,
  username: process.env.PGUSER || 'user1',
  password: process.env.PGPASSWORD || 'password',
  database: process.env.PGDATABASE || 'todo',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // Auto-creates database tables in development (use false in production)
};

export default postgresConfig;
