import { MigrationInterface, QueryRunner } from 'typeorm';

export class WCZdqc1697600288857 implements MigrationInterface {
    name = 'WCZdqc1697600288857';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`shop_deals\` ADD \`source\` varchar(255) NOT NULL COMMENT '来源'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`shop_deals\` ADD \`show\` tinyint NOT NULL COMMENT '是否展示' DEFAULT 1`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shop_deals\` DROP COLUMN \`show\``);
        await queryRunner.query(`ALTER TABLE \`shop_deals\` DROP COLUMN \`source\``);
    }
}
