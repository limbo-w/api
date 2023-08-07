import { MigrationInterface, QueryRunner } from "typeorm";

export class ScYeSC1675755880017 implements MigrationInterface {
    name = 'ScYeSC1675755880017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_refresh_tokens\` (\`id\` varchar(36) NOT NULL, \`value\` varchar(500) NOT NULL, \`expired_at\` datetime NOT NULL COMMENT '令牌过期时间', \`createdAt\` datetime(6) NOT NULL COMMENT '令牌创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`accessTokenId\` varchar(36) NULL, UNIQUE INDEX \`REL_1dfd080c2abf42198691b60ae3\` (\`accessTokenId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rbac_roles\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL COMMENT '角色名称', \`label\` varchar(255) NULL COMMENT '显示名称', \`description\` text NULL COMMENT '角色描述', \`systemed\` tinyint NOT NULL COMMENT '是否为不可更改的系统权限' DEFAULT 0, \`deletedAt\` datetime(6) NULL COMMENT '删除时间', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rbac_permissions\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL COMMENT '权限名称', \`label\` varchar(255) NULL COMMENT '权限显示名', \`description\` text NULL COMMENT '权限描述', \`rule\` text NOT NULL COMMENT '权限规则', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`nickname\` varchar(255) NULL COMMENT '姓名', \`username\` varchar(255) NOT NULL COMMENT '用户名', \`password\` varchar(500) NOT NULL COMMENT '密码', \`phone\` varchar(255) NULL COMMENT '手机号', \`email\` varchar(255) NULL COMMENT '邮箱', \`actived\` tinyint NOT NULL COMMENT '用户状态,是否激活' DEFAULT 1, \`isCreator\` tinyint NOT NULL COMMENT '是否是创始人' DEFAULT 0, \`createdAt\` datetime(6) NOT NULL COMMENT '用户创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT '用户更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`earned\` float NOT NULL COMMENT '优惠券总额' DEFAULT '0', \`redeemed\` float NOT NULL COMMENT '优惠券余额' DEFAULT '0', \`deletedAt\` datetime(6) NULL COMMENT '删除时间', UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` (\`phone\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_access_tokens\` (\`id\` varchar(36) NOT NULL, \`value\` varchar(500) NOT NULL, \`expired_at\` datetime NOT NULL COMMENT '令牌过期时间', \`createdAt\` datetime(6) NOT NULL COMMENT '令牌创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_captchas\` (\`id\` varchar(36) NOT NULL, \`code\` varchar(255) NOT NULL COMMENT '验证码', \`action\` enum ('login', 'register', 'retrieve-password', 'reset-password', 'account-bound') NOT NULL COMMENT '验证操作类型', \`value\` varchar(255) NOT NULL COMMENT '邮箱地址', \`created_at\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`storage_medias\` (\`id\` varchar(36) NOT NULL, \`file\` varchar(255) NOT NULL COMMENT '文件存储位置', \`ext\` varchar(255) NOT NULL COMMENT '文件后缀', \`createdAt\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, \`memberId\` varchar(36) NULL, \`brandId\` varchar(36) NULL, \`dealId\` varchar(36) NULL, \`bannerId\` varchar(36) NULL, UNIQUE INDEX \`REL_a4b8f72d2e7cdd5dc21ea5512a\` (\`memberId\`), UNIQUE INDEX \`REL_14a101bbab57d4ea9db43db2bd\` (\`brandId\`), UNIQUE INDEX \`REL_0d98babe8b9f6b5f7de62370bb\` (\`dealId\`), UNIQUE INDEX \`REL_e1683e8da28e164ec43662a414\` (\`bannerId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_pusheds\` (\`id\` varchar(36) NOT NULL, \`dealId\` varchar(36) NULL, UNIQUE INDEX \`REL_02f5e73d3ce482bdcda5278d39\` (\`dealId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shop_banners\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL COMMENT 'banner备注', \`link\` varchar(255) NOT NULL COMMENT '点击跳转地址', \`discountInfo\` varchar(255) NOT NULL COMMENT '折扣信息', \`customOrder\` int NOT NULL COMMENT 'banner''s order' DEFAULT '0', \`createdAt\` datetime(6) NOT NULL COMMENT 'created at time' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT 'updated at time' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`storeId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shop_stores\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL COMMENT 'store name', \`script\` varchar(255) NOT NULL COMMENT 'store script', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shop_orders\` (\`id\` varchar(36) NOT NULL, \`numerical\` varchar(255) NOT NULL COMMENT 'order number', \`amount\` float NOT NULL COMMENT 'amount of consumption', \`status\` tinyint NOT NULL COMMENT 'false is padding, true is reject' DEFAULT 0, \`createdAt\` datetime(6) NOT NULL COMMENT 'created at time' DEFAULT CURRENT_TIMESTAMP(6), \`brandId\` varchar(36) NULL, \`dealId\` varchar(36) NULL, \`storeId\` varchar(36) NOT NULL, \`userId\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shop_brands\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL COMMENT 'brand name', FULLTEXT INDEX \`IDX_e5e1c0190e22bb07ad138169d3\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shop_deals\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` longtext NOT NULL COMMENT 'deal description', \`oldPrice\` float NULL COMMENT 'deal old price', \`price\` float NOT NULL COMMENT 'deal price', \`link\` varchar(255) NOT NULL COMMENT 'deal link', \`isTop\` tinyint NOT NULL COMMENT 'show deal at homepage top swipper' DEFAULT 0, \`endedAt\` varchar(255) NULL COMMENT 'ends time', \`keywords\` text NULL COMMENT 'deals keywords', \`createdAt\` datetime(6) NOT NULL COMMENT 'created at time' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT 'updated at time' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`customOrder\` int NOT NULL COMMENT 'deal''s order' DEFAULT '0', \`categoryId\` varchar(36) NOT NULL, \`brandId\` varchar(36) NOT NULL, \`storeId\` varchar(36) NOT NULL, FULLTEXT INDEX \`IDX_867a0e1a735e8a2aa17e496ca7\` (\`title\`), FULLTEXT INDEX \`IDX_44c94b46fb4e7ffa4f4ea9bcf1\` (\`description\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shop_categories\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL COMMENT 'cateogry name', \`icon\` varchar(255) NULL COMMENT 'cateogry icon', \`customOrder\` int NOT NULL COMMENT 'deal''s order' DEFAULT '0', FULLTEXT INDEX \`IDX_b97c1388c826a5cc87d726f2a9\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rbac_roles_users_users\` (\`rbacRolesId\` varchar(36) NOT NULL, \`usersId\` varchar(36) NOT NULL, INDEX \`IDX_3c933e8c0950496fa3a616e4b2\` (\`rbacRolesId\`), INDEX \`IDX_789b5818a876ba2c4f058bdeb9\` (\`usersId\`), PRIMARY KEY (\`rbacRolesId\`, \`usersId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rbac_permissions_roles_rbac_roles\` (\`rbacPermissionsId\` varchar(36) NOT NULL, \`rbacRolesId\` varchar(36) NOT NULL, INDEX \`IDX_a3fab43faecb8e0f9b0345cedb\` (\`rbacPermissionsId\`), INDEX \`IDX_df26ec979184812b60c1c1a4e3\` (\`rbacRolesId\`), PRIMARY KEY (\`rbacPermissionsId\`, \`rbacRolesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rbac_permissions_users_users\` (\`rbacPermissionsId\` varchar(36) NOT NULL, \`usersId\` varchar(36) NOT NULL, INDEX \`IDX_d12a35b88ace69f10656e31e58\` (\`rbacPermissionsId\`), INDEX \`IDX_5910a3c31c94389248bd34afc4\` (\`usersId\`), PRIMARY KEY (\`rbacPermissionsId\`, \`usersId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shop_deals_favoriters_users\` (\`shopDealsId\` varchar(36) NOT NULL, \`usersId\` varchar(36) NOT NULL, INDEX \`IDX_ae81d186a29b3fc0c220345547\` (\`shopDealsId\`), INDEX \`IDX_310a63ad73a24c220f1e0ec6cf\` (\`usersId\`), PRIMARY KEY (\`shopDealsId\`, \`usersId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_refresh_tokens\` ADD CONSTRAINT \`FK_1dfd080c2abf42198691b60ae39\` FOREIGN KEY (\`accessTokenId\`) REFERENCES \`user_access_tokens\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_access_tokens\` ADD CONSTRAINT \`FK_71a030e491d5c8547fc1e38ef82\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`storage_medias\` ADD CONSTRAINT \`FK_86b01412473b2f9db17faf7bac0\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`storage_medias\` ADD CONSTRAINT \`FK_a4b8f72d2e7cdd5dc21ea5512a4\` FOREIGN KEY (\`memberId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`storage_medias\` ADD CONSTRAINT \`FK_14a101bbab57d4ea9db43db2bd8\` FOREIGN KEY (\`brandId\`) REFERENCES \`shop_brands\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`storage_medias\` ADD CONSTRAINT \`FK_0d98babe8b9f6b5f7de62370bb9\` FOREIGN KEY (\`dealId\`) REFERENCES \`shop_deals\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`storage_medias\` ADD CONSTRAINT \`FK_e1683e8da28e164ec43662a414b\` FOREIGN KEY (\`bannerId\`) REFERENCES \`shop_banners\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_pusheds\` ADD CONSTRAINT \`FK_02f5e73d3ce482bdcda5278d391\` FOREIGN KEY (\`dealId\`) REFERENCES \`shop_deals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shop_banners\` ADD CONSTRAINT \`FK_d3e7595572657d28622f188d240\` FOREIGN KEY (\`storeId\`) REFERENCES \`shop_stores\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`shop_orders\` ADD CONSTRAINT \`FK_2d7aa0b0a3acbea25b98394d034\` FOREIGN KEY (\`brandId\`) REFERENCES \`shop_brands\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shop_orders\` ADD CONSTRAINT \`FK_b1f655ac199f80a1ab417f2b032\` FOREIGN KEY (\`dealId\`) REFERENCES \`shop_deals\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shop_orders\` ADD CONSTRAINT \`FK_d68e9a69fc022bb734711138295\` FOREIGN KEY (\`storeId\`) REFERENCES \`shop_stores\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`shop_orders\` ADD CONSTRAINT \`FK_3741c993aebb19594b558f0f20e\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`shop_deals\` ADD CONSTRAINT \`FK_19c46901e94c1ffc7491d77aa14\` FOREIGN KEY (\`categoryId\`) REFERENCES \`shop_categories\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`shop_deals\` ADD CONSTRAINT \`FK_0e5f404fd96685f2ee2f2739cfe\` FOREIGN KEY (\`brandId\`) REFERENCES \`shop_brands\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`shop_deals\` ADD CONSTRAINT \`FK_646e4217470f8d79f2a5a39f9d6\` FOREIGN KEY (\`storeId\`) REFERENCES \`shop_stores\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`rbac_roles_users_users\` ADD CONSTRAINT \`FK_3c933e8c0950496fa3a616e4b27\` FOREIGN KEY (\`rbacRolesId\`) REFERENCES \`rbac_roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`rbac_roles_users_users\` ADD CONSTRAINT \`FK_789b5818a876ba2c4f058bdeb98\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rbac_permissions_roles_rbac_roles\` ADD CONSTRAINT \`FK_a3fab43faecb8e0f9b0345cedba\` FOREIGN KEY (\`rbacPermissionsId\`) REFERENCES \`rbac_permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`rbac_permissions_roles_rbac_roles\` ADD CONSTRAINT \`FK_df26ec979184812b60c1c1a4e3a\` FOREIGN KEY (\`rbacRolesId\`) REFERENCES \`rbac_roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rbac_permissions_users_users\` ADD CONSTRAINT \`FK_d12a35b88ace69f10656e31e587\` FOREIGN KEY (\`rbacPermissionsId\`) REFERENCES \`rbac_permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`rbac_permissions_users_users\` ADD CONSTRAINT \`FK_5910a3c31c94389248bd34afc48\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shop_deals_favoriters_users\` ADD CONSTRAINT \`FK_ae81d186a29b3fc0c220345547b\` FOREIGN KEY (\`shopDealsId\`) REFERENCES \`shop_deals\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`shop_deals_favoriters_users\` ADD CONSTRAINT \`FK_310a63ad73a24c220f1e0ec6cf5\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shop_deals_favoriters_users\` DROP FOREIGN KEY \`FK_310a63ad73a24c220f1e0ec6cf5\``);
        await queryRunner.query(`ALTER TABLE \`shop_deals_favoriters_users\` DROP FOREIGN KEY \`FK_ae81d186a29b3fc0c220345547b\``);
        await queryRunner.query(`ALTER TABLE \`rbac_permissions_users_users\` DROP FOREIGN KEY \`FK_5910a3c31c94389248bd34afc48\``);
        await queryRunner.query(`ALTER TABLE \`rbac_permissions_users_users\` DROP FOREIGN KEY \`FK_d12a35b88ace69f10656e31e587\``);
        await queryRunner.query(`ALTER TABLE \`rbac_permissions_roles_rbac_roles\` DROP FOREIGN KEY \`FK_df26ec979184812b60c1c1a4e3a\``);
        await queryRunner.query(`ALTER TABLE \`rbac_permissions_roles_rbac_roles\` DROP FOREIGN KEY \`FK_a3fab43faecb8e0f9b0345cedba\``);
        await queryRunner.query(`ALTER TABLE \`rbac_roles_users_users\` DROP FOREIGN KEY \`FK_789b5818a876ba2c4f058bdeb98\``);
        await queryRunner.query(`ALTER TABLE \`rbac_roles_users_users\` DROP FOREIGN KEY \`FK_3c933e8c0950496fa3a616e4b27\``);
        await queryRunner.query(`ALTER TABLE \`shop_deals\` DROP FOREIGN KEY \`FK_646e4217470f8d79f2a5a39f9d6\``);
        await queryRunner.query(`ALTER TABLE \`shop_deals\` DROP FOREIGN KEY \`FK_0e5f404fd96685f2ee2f2739cfe\``);
        await queryRunner.query(`ALTER TABLE \`shop_deals\` DROP FOREIGN KEY \`FK_19c46901e94c1ffc7491d77aa14\``);
        await queryRunner.query(`ALTER TABLE \`shop_orders\` DROP FOREIGN KEY \`FK_3741c993aebb19594b558f0f20e\``);
        await queryRunner.query(`ALTER TABLE \`shop_orders\` DROP FOREIGN KEY \`FK_d68e9a69fc022bb734711138295\``);
        await queryRunner.query(`ALTER TABLE \`shop_orders\` DROP FOREIGN KEY \`FK_b1f655ac199f80a1ab417f2b032\``);
        await queryRunner.query(`ALTER TABLE \`shop_orders\` DROP FOREIGN KEY \`FK_2d7aa0b0a3acbea25b98394d034\``);
        await queryRunner.query(`ALTER TABLE \`shop_banners\` DROP FOREIGN KEY \`FK_d3e7595572657d28622f188d240\``);
        await queryRunner.query(`ALTER TABLE \`user_pusheds\` DROP FOREIGN KEY \`FK_02f5e73d3ce482bdcda5278d391\``);
        await queryRunner.query(`ALTER TABLE \`storage_medias\` DROP FOREIGN KEY \`FK_e1683e8da28e164ec43662a414b\``);
        await queryRunner.query(`ALTER TABLE \`storage_medias\` DROP FOREIGN KEY \`FK_0d98babe8b9f6b5f7de62370bb9\``);
        await queryRunner.query(`ALTER TABLE \`storage_medias\` DROP FOREIGN KEY \`FK_14a101bbab57d4ea9db43db2bd8\``);
        await queryRunner.query(`ALTER TABLE \`storage_medias\` DROP FOREIGN KEY \`FK_a4b8f72d2e7cdd5dc21ea5512a4\``);
        await queryRunner.query(`ALTER TABLE \`storage_medias\` DROP FOREIGN KEY \`FK_86b01412473b2f9db17faf7bac0\``);
        await queryRunner.query(`ALTER TABLE \`user_access_tokens\` DROP FOREIGN KEY \`FK_71a030e491d5c8547fc1e38ef82\``);
        await queryRunner.query(`ALTER TABLE \`user_refresh_tokens\` DROP FOREIGN KEY \`FK_1dfd080c2abf42198691b60ae39\``);
        await queryRunner.query(`DROP INDEX \`IDX_310a63ad73a24c220f1e0ec6cf\` ON \`shop_deals_favoriters_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_ae81d186a29b3fc0c220345547\` ON \`shop_deals_favoriters_users\``);
        await queryRunner.query(`DROP TABLE \`shop_deals_favoriters_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_5910a3c31c94389248bd34afc4\` ON \`rbac_permissions_users_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_d12a35b88ace69f10656e31e58\` ON \`rbac_permissions_users_users\``);
        await queryRunner.query(`DROP TABLE \`rbac_permissions_users_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_df26ec979184812b60c1c1a4e3\` ON \`rbac_permissions_roles_rbac_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_a3fab43faecb8e0f9b0345cedb\` ON \`rbac_permissions_roles_rbac_roles\``);
        await queryRunner.query(`DROP TABLE \`rbac_permissions_roles_rbac_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_789b5818a876ba2c4f058bdeb9\` ON \`rbac_roles_users_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c933e8c0950496fa3a616e4b2\` ON \`rbac_roles_users_users\``);
        await queryRunner.query(`DROP TABLE \`rbac_roles_users_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_b97c1388c826a5cc87d726f2a9\` ON \`shop_categories\``);
        await queryRunner.query(`DROP TABLE \`shop_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_44c94b46fb4e7ffa4f4ea9bcf1\` ON \`shop_deals\``);
        await queryRunner.query(`DROP INDEX \`IDX_867a0e1a735e8a2aa17e496ca7\` ON \`shop_deals\``);
        await queryRunner.query(`DROP TABLE \`shop_deals\``);
        await queryRunner.query(`DROP INDEX \`IDX_e5e1c0190e22bb07ad138169d3\` ON \`shop_brands\``);
        await queryRunner.query(`DROP TABLE \`shop_brands\``);
        await queryRunner.query(`DROP TABLE \`shop_orders\``);
        await queryRunner.query(`DROP TABLE \`shop_stores\``);
        await queryRunner.query(`DROP TABLE \`shop_banners\``);
        await queryRunner.query(`DROP INDEX \`REL_02f5e73d3ce482bdcda5278d39\` ON \`user_pusheds\``);
        await queryRunner.query(`DROP TABLE \`user_pusheds\``);
        await queryRunner.query(`DROP INDEX \`REL_e1683e8da28e164ec43662a414\` ON \`storage_medias\``);
        await queryRunner.query(`DROP INDEX \`REL_0d98babe8b9f6b5f7de62370bb\` ON \`storage_medias\``);
        await queryRunner.query(`DROP INDEX \`REL_14a101bbab57d4ea9db43db2bd\` ON \`storage_medias\``);
        await queryRunner.query(`DROP INDEX \`REL_a4b8f72d2e7cdd5dc21ea5512a\` ON \`storage_medias\``);
        await queryRunner.query(`DROP TABLE \`storage_medias\``);
        await queryRunner.query(`DROP TABLE \`user_captchas\``);
        await queryRunner.query(`DROP TABLE \`user_access_tokens\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`rbac_permissions\``);
        await queryRunner.query(`DROP TABLE \`rbac_roles\``);
        await queryRunner.query(`DROP INDEX \`REL_1dfd080c2abf42198691b60ae3\` ON \`user_refresh_tokens\``);
        await queryRunner.query(`DROP TABLE \`user_refresh_tokens\``);
    }

}
