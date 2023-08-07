import { DealFactory, OrderFactory } from '@/database/factories/shop.factory';
import { UserFactory } from '@/database/factories/user.factory';
import ShopSeeder from '@/database/seeders/shop.seeder';
import UserSeeder from '@/database/seeders/user.seeder';
import { ConfigureFactory } from '@/modules/core/types';
import { createDbOptions } from '@/modules/database/helpers';
import { DbConfigOptions, DbConfig } from '@/modules/database/types';

/**
 * 数据库配置函数
 */
export const database: ConfigureFactory<DbConfigOptions, DbConfig> = {
    register: (configure) => ({
        common: {
            charset: 'utf8mb4',
            synchronize: false,
            logging: ['error'],
            // paths: {
            //     migration: resolve(__dirname, '../database/migrations'),
            // },
        },
        connections: [
            {
                type: 'mysql',
                host: '127.0.0.1',
                port: 3306,
                username: 'root',
                password: configure.env('DB_PASSWORD', '123456'),
                database: configure.env('DB_NAME', 'goflash'),
                // entities: [],
                // 自动加载模块中注册的entity
                // autoLoadEntities: true,
                // 可以在webpack热更新时保持连接,目前用不到
                // keepConnectionAlive: true,
                // 可以在开发环境下同步entity的数据结构到数据库
                // synchronize: false,
                seeders: [UserSeeder, ShopSeeder],
                factories: [UserFactory, DealFactory, OrderFactory],
            },
        ],
    }),
    hook: (configure, value) => createDbOptions(value),
};
