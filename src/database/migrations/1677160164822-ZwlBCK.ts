import { MigrationInterface, QueryRunner } from "typeorm";

export class ZwlBCK1677160164822 implements MigrationInterface {
    name = 'ZwlBCK1677160164822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shop_deals\` DROP FOREIGN KEY \`FK_19c46901e94c1ffc7491d77aa14\``);
        await queryRunner.query(`CREATE TABLE \`shop_deals_categories_shop_categories\` (\`shopDealsId\` varchar(36) NOT NULL, \`shopCategoriesId\` varchar(36) NOT NULL, INDEX \`IDX_6609ed7f367e511bd2ce3480f5\` (\`shopDealsId\`), INDEX \`IDX_d340f26669087d6a21f688f21a\` (\`shopCategoriesId\`), PRIMARY KEY (\`shopDealsId\`, \`shopCategoriesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`shop_deals\` DROP COLUMN \`categoryId\``);
        await queryRunner.query(`ALTER TABLE \`shop_deals_categories_shop_categories\` ADD CONSTRAINT \`FK_6609ed7f367e511bd2ce3480f58\` FOREIGN KEY (\`shopDealsId\`) REFERENCES \`shop_deals\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`shop_deals_categories_shop_categories\` ADD CONSTRAINT \`FK_d340f26669087d6a21f688f21a5\` FOREIGN KEY (\`shopCategoriesId\`) REFERENCES \`shop_categories\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shop_deals_categories_shop_categories\` DROP FOREIGN KEY \`FK_d340f26669087d6a21f688f21a5\``);
        await queryRunner.query(`ALTER TABLE \`shop_deals_categories_shop_categories\` DROP FOREIGN KEY \`FK_6609ed7f367e511bd2ce3480f58\``);
        await queryRunner.query(`ALTER TABLE \`shop_deals\` ADD \`categoryId\` varchar(36) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_d340f26669087d6a21f688f21a\` ON \`shop_deals_categories_shop_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_6609ed7f367e511bd2ce3480f5\` ON \`shop_deals_categories_shop_categories\``);
        await queryRunner.query(`DROP TABLE \`shop_deals_categories_shop_categories\``);
        await queryRunner.query(`ALTER TABLE \`shop_deals\` ADD CONSTRAINT \`FK_19c46901e94c1ffc7491d77aa14\` FOREIGN KEY (\`categoryId\`) REFERENCES \`shop_categories\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
