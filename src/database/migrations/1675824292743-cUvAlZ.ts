import { MigrationInterface, QueryRunner } from "typeorm";

export class CUvAlZ1675824292743 implements MigrationInterface {
    name = 'CUvAlZ1675824292743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shop_stores\` ADD \`cashbackSetting\` int NOT NULL COMMENT '返现配置'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shop_stores\` DROP COLUMN \`cashbackSetting\``);
    }

}
