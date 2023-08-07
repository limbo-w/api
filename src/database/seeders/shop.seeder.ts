import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

import { lookup } from 'mime-types';
import { DataSource, EntityManager } from 'typeorm';

import { panic } from '@/modules/core/helpers';
import { BaseSeeder } from '@/modules/database/base';
import { getCustomRepository } from '@/modules/database/helpers';
import { DbFactory } from '@/modules/database/types';
import { MediaEntity } from '@/modules/media/entities';
import { uploadLocalFile } from '@/modules/media/helpers';
import {
    DealEntity,
    StoreEntity,
    CategoryEntity,
    BrandEntity,
    OrderEntity,
} from '@/modules/shop/entities';
import {
    BrandRepository,
    CategoryRepository,
    DealRepository,
    OrderRepository,
    StoreRepository,
} from '@/modules/shop/repositories';

import { UserRepository } from '@/modules/user/repositories';

import {
    BrandData,
    brands,
    categories,
    CategoryData,
    StoreData,
    stores,
} from '../factories/shop.data';
import { IDealFactoryOptions, IOrderFactoryOptions } from '../factories/shop.factory';

export default class ShopSeeder extends BaseSeeder {
    protected truncates = [DealEntity, CategoryEntity, StoreEntity, BrandEntity];

    protected factorier!: DbFactory;

    protected userRepository: UserRepository;

    async run(_factorier: DbFactory, _dataSource: DataSource, _em: EntityManager): Promise<any> {
        this.factorier = _factorier;
        this.userRepository = getCustomRepository(this.dataSource, UserRepository);
        const categoryRepository = getCustomRepository(this.dataSource, CategoryRepository);
        const brandRepository = getCustomRepository(this.dataSource, BrandRepository);
        const storeRepository = getCustomRepository(this.dataSource, StoreRepository);
        const dealRepository = getCustomRepository(this.dataSource, DealRepository);
        const orderRepository = getCustomRepository(this.dataSource, OrderRepository);
        if ((await categoryRepository.count()) < 1) await this.loadCategories(categories);
        if ((await brandRepository.count()) < 1) await this.loadBrands(brands);
        if ((await storeRepository.count()) < 1) await this.loadStores(stores);
        if ((await dealRepository.count()) < 1)
            await this.loadDeals(categoryRepository, brandRepository, storeRepository);
        if ((await orderRepository.count()) < 1)
            await this.loadOrders(storeRepository, dealRepository, brandRepository);
    }

    protected async loadCategories(data: CategoryData[]) {
        let order = 0;
        for (const item of data) {
            const category = new CategoryEntity();
            category.name = item.name;
            if (item.icon) category.icon = item.icon;
            category.customOrder = order;
            await CategoryEntity.save(category);
            order++;
        }
    }

    protected async loadBrands(data: BrandData[]) {
        const creator = await this.userRepository.findOneByOrFail({ isCreator: true });
        for (const item of data) {
            const brand = new BrandEntity();
            brand.name = item.name;
            const logoPath = resolve(__dirname, '../../assets/media', item.logo);
            if (!existsSync(logoPath)) {
                panic(`File ${logoPath} not exists!`);
            }
            const mediaPath = uploadLocalFile(
                {
                    filename: item.logo,
                    mimetype: lookup(logoPath) as string,
                    value: readFileSync(logoPath, { encoding: 'base64' }),
                },
                'brands',
            );
            const media = new MediaEntity();
            media.file = mediaPath;
            media.user = creator;
            const logo = await MediaEntity.save(media);
            brand.logo = logo;
            await BrandEntity.save(brand);
        }
    }

    protected async loadStores(data: StoreData[]) {
        for (const item of data) {
            const store = new StoreEntity();
            store.name = item.name;
            store.script = item.script;
            await StoreEntity.save(store);
        }
    }

    protected async loadDeals(
        cateRepo: CategoryRepository,
        brandRepo: BrandRepository,
        storeRepo: StoreRepository,
    ) {
        await this.factorier(DealEntity)<IDealFactoryOptions>({
            categories: await cateRepo.find(),
            brands: await brandRepo.find(),
            stores: await storeRepo.find(),
            users: await this.userRepository.find(),
        }).createMany(100);
    }

    protected async loadOrders(
        storeRepo: StoreRepository,
        dealRepo: DealRepository,
        brandRepo: BrandRepository,
    ) {
        await this.factorier(OrderEntity)<IOrderFactoryOptions>({
            deals: await dealRepo.find(),
            stores: await storeRepo.find(),
            users: await this.userRepository.find(),
            brands: await brandRepo.find(),
        }).createMany(200);
    }
}
