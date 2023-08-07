import { randomBytes } from 'crypto';
import { resolve } from 'path';

import { Faker } from '@faker-js/faker';

import { existsSync, readFileSync } from 'fs-extra';

import { lookup } from 'mime-types';

import {
    getRandItemData,
    getRandListData,
    getRandomIndex,
    getTime,
    panic,
} from '@/modules/core/helpers';
import { defineFactory } from '@/modules/database/helpers';
import { MediaEntity } from '@/modules/media/entities';
import { uploadLocalFile } from '@/modules/media/helpers';
import {
    BrandEntity,
    CategoryEntity,
    DealEntity,
    OrderEntity,
    StoreEntity,
} from '@/modules/shop/entities';
import { UserEntity } from '@/modules/user/entities';
import { getUserConfig } from '@/modules/user/helpers';
import { UserConfig } from '@/modules/user/types';

export type IDealFactoryOptions = Partial<{
    title: string;
    description: string;
}> & {
    categories: CategoryEntity[];
    brands: BrandEntity[];
    stores: StoreEntity[];
    users: UserEntity[];
};

export type IOrderFactoryOptions = {
    deals: DealEntity[];
    brands: BrandEntity[];
    stores: StoreEntity[];
    users: UserEntity[];
};

export const DealFactory = defineFactory(
    DealEntity,
    async (faker: Faker, options: IDealFactoryOptions) => {
        // faker.setLocale('zh_CN');
        const deal = new DealEntity();
        const { title, description, categories, brands, stores, users } = options;
        deal.title = title ?? faker.lorem.sentence(Math.floor(Math.random() * 10) + 6);
        deal.description = description ?? faker.lorem.paragraph(Math.floor(Math.random() * 20) + 1);
        deal.price = Number((getRandomIndex(300) + Math.random()).toFixed(2));
        deal.oldPrice = Number((deal.price + getRandomIndex(50)).toFixed(2));
        deal.isTop = Math.random() >= 0.8;
        deal.endedAt = getTime().add(getRandomIndex(20), 'day').toDate();
        deal.categories = [getRandItemData(categories)];
        deal.brand = getRandItemData(brands);
        deal.store = getRandItemData(stores);
        deal.favoriters = getRandListData(users);
        deal.link = 'https://google.com';
        const { username } = getUserConfig<UserConfig['super']>('super');
        const creator = await UserEntity.findOneByOrFail({ username });
        const imagePath = resolve(
            __dirname,
            `../../assets/media/deal-${getRandomIndex(7).toString()}.webp`,
        );

        if (!existsSync(imagePath)) {
            panic(`File ${imagePath} not exists!`);
        }
        const mediaPath = uploadLocalFile(
            {
                filename: imagePath,
                mimetype: lookup(imagePath) as string,
                value: readFileSync(imagePath, { encoding: 'base64' }),
            },
            'brands',
        );
        const media = new MediaEntity();
        media.file = mediaPath;
        media.user = creator;
        const image = await MediaEntity.save(media);
        deal.image = image;
        return deal;
    },
);

export const OrderFactory = defineFactory(
    OrderEntity,
    async (faker: Faker, options: IOrderFactoryOptions) => {
        const { deals, stores, brands, users } = options;
        const deal = getRandItemData(deals);
        const order = new OrderEntity();
        order.numerical = randomBytes(11).toString('hex').slice(0, 22);
        order.amount = deal.price;
        order.deal = deal;
        order.store = getRandItemData(stores);
        order.user = getRandItemData(users);
        order.brand = getRandItemData(brands);
        order.status = getRandomIndex(10) > 5;
        return order;
    },
);
