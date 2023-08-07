import { MigrationInterface, QueryRunner } from "typeorm";

export class DKpnLX1676864250229 implements MigrationInterface {
    name = 'DKpnLX1676864250229'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shop_deals\` CHANGE \`price\` \`price\` float NOT NULL COMMENT 'deal price' DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shop_deals\` CHANGE \`price\` \`price\` float NOT NULL COMMENT 'deal price'`);
    }

}
