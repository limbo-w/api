import { MigrationInterface, QueryRunner } from "typeorm";

export class TuxMWa1676193144675 implements MigrationInterface {
    name = 'TuxMWa1676193144675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shop_stores\` ADD \`allianceName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`shop_stores\` ADD \`url\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shop_stores\` DROP COLUMN \`url\``);
        await queryRunner.query(`ALTER TABLE \`shop_stores\` DROP COLUMN \`allianceName\``);
    }

}
