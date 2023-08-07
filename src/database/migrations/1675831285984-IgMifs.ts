import { MigrationInterface, QueryRunner } from "typeorm";

export class IgMifs1675831285984 implements MigrationInterface {
    name = 'IgMifs1675831285984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shop_stores\` ADD \`country\` varchar(255) NOT NULL COMMENT 'country'`);
        await queryRunner.query(`ALTER TABLE \`shop_stores\` ADD \`logoId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`shop_stores\` ADD \`backgroundId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`shop_stores\` ADD CONSTRAINT \`FK_890ac64f5d7b0ea4504407f0021\` FOREIGN KEY (\`logoId\`) REFERENCES \`storage_medias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shop_stores\` ADD CONSTRAINT \`FK_a8a9fb6ac106ea8c21e53924536\` FOREIGN KEY (\`backgroundId\`) REFERENCES \`storage_medias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shop_stores\` DROP FOREIGN KEY \`FK_a8a9fb6ac106ea8c21e53924536\``);
        await queryRunner.query(`ALTER TABLE \`shop_stores\` DROP FOREIGN KEY \`FK_890ac64f5d7b0ea4504407f0021\``);
        await queryRunner.query(`ALTER TABLE \`shop_stores\` DROP COLUMN \`backgroundId\``);
        await queryRunner.query(`ALTER TABLE \`shop_stores\` DROP COLUMN \`logoId\``);
        await queryRunner.query(`ALTER TABLE \`shop_stores\` DROP COLUMN \`country\``);
    }

}
