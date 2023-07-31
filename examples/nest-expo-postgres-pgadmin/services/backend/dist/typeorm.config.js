"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgresConfig = {
    type: 'postgres',
    host: process.env.PGHOST || 'localhost',
    port: parseInt(process.env.PGPORT, 10) || 5432,
    username: process.env.PGUSER || 'user1',
    password: process.env.PGPASSWORD || 'password',
    database: process.env.PGDATABASE || 'todo',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
};
exports.default = postgresConfig;
//# sourceMappingURL=typeorm.config.js.map