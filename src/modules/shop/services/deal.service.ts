import { Injectable } from '@nestjs/common';

import { isNil } from 'lodash';
import { In, SelectQueryBuilder } from 'typeorm';

import { Configure } from '@/modules/core/configure';
import { ClassToPlain } from '@/modules/core/types';
import { BaseService } from '@/modules/database/base';
import { QueryHook } from '@/modules/database/types';
import { MediaRepository } from '@/modules/media/repositories';
import { PushedEntity } from '@/modules/shop/entities/pushed.entity';
import { UserEntity } from '@/modules/user/entities';

import { DealOrderType } from '../constants';
import { ManageCreateDealDto, ManageUpdateDealDto, QueryDealDto } from '../dtos';
import { DealEntity } from '../entities';

import {
    BrandRepository,
    CategoryRepository,
    DealRepository,
    PushedRepository,
} from '../repositories';

import { StoreRepository } from '../repositories/store.repository';
import { getTime } from '@/modules/core/helpers';

type FindParams = {
    [key in keyof Omit<QueryDealDto, 'limit' | 'page'>]: QueryDealDto[key];
};

@Injectable()
export class DealService extends BaseService<DealEntity, DealRepository> {
    constructor(
        protected repository: DealRepository,
        protected categoryRepository: CategoryRepository,
        protected storeRepository: StoreRepository,
        protected brandRepository: BrandRepository,
        protected pushedRepository: PushedRepository,
        protected mediaRepository: MediaRepository,
        protected configure: Configure,
    ) {
        super(repository);
    }

    async create({ categories, store, brand, image, ...data }: ManageCreateDealDto) {
        const item = await this.repository.save({
            ...data,
            image: await this.mediaRepository.findOneByOrFail({ id: image }),
            categories: await this.categoryRepository.find({ where: { id: In(categories) } }),
            store: await this.storeRepository.findOneByOrFail({ id: store }),
            brand: await this.brandRepository.findOneByOrFail({ id: brand }),
        });
        return this.detail(item.id);
    }

    async update({ id, categories, store, brand, image, ...data }: ManageUpdateDealDto) {
        const item = await this.detail(id);
        if (!isNil(image)) {
            if ((!isNil(item.image) && item.image.id !== image) || isNil(item.image)) {
                if (!isNil(item.image)) await this.mediaRepository.remove(item.image);
                const current = await this.mediaRepository.findOneByOrFail({ id: image });
                current.deal = await this.repository.findOneByOrFail({ id });
                await this.mediaRepository.save(current);
            }
        }

        item.categories = await this.categoryRepository.find({ where: { id: In(categories) } });
        await this.repository.save(item);
        await this.repository.update(id, {
            ...data,
            store: store ? await this.storeRepository.findOneByOrFail({ id: store }) : undefined,
            brand: brand ? await this.brandRepository.findOneByOrFail({ id: brand }) : undefined,
        });
        return this.detail(id);
    }

    async getPushed() {
        return this.pushedRepository.find({
            take: 5,
        });
    }

    async changePushed(id: string) {
        const deal = await this.detail(id);
        if (deal.pushed) {
            deal.pushed = null;
            await DealEntity.save(deal);
        } else {
            const pushed = new PushedEntity();
            pushed.deal = deal;
            await PushedEntity.save(pushed);
        }
    }

    async favorite(id: string, user: ClassToPlain<UserEntity>) {
        const deal = await this.repository.findOneOrFail({
            relations: ['favoriters'],
            where: { id },
        });
        const qb = this.repository
            .createQueryBuilder(this.repository.getQBName())
            .relation(DealEntity, 'favoriters')
            .of(deal);
        const ids = deal.favoriters.map((u) => u.id);
        if (ids.includes(id)) await qb.remove(id);
        else qb.add(id);
        return this.detail(id);
    }

    protected async buildListQuery(
        queryBuilder: SelectQueryBuilder<DealEntity>,
        options: FindParams,
        callback?: QueryHook<DealEntity>,
    ) {
        const { category, store, brand, isTop, isExpired, orderBy, search } = options;
        let qb = queryBuilder;
        if (typeof isTop === 'boolean') qb.andWhere({ isTop });
        if (!isNil(isExpired)) {
            const now = getTime({format: 'YYYY-MM-DD HH:mm'}).toDate();
            if (isExpired) {
                qb.andWhere('`endedAt` < :now', { now });
            } else {
                qb.andWhere('`endedAt` >= :now', { now });
            }
        }
        if (!isNil(store))
            qb.andWhere({
                store,
            });

        if (!isNil(category))
            qb.andWhere('`deal_categories`.`shopCategoriesId` = :category', {
                category: `${category}`,
            });
        if (!isNil(brand))
            qb.andWhere({
                brand,
            });
        if (!isNil(search)) {
            qb.andWhere('`title` LIKE :search', { search: `%${search}%` })
                .orWhere('`description` LIKE :search', { search: `%${search}%` })
                .orWhere('`brand`.`name` LIKE :search', { search: `%${search}%` });
        }

        this.queryOrderBy(qb, orderBy);
        if (callback) qb = await callback(qb);
        return super.buildListQuery(qb, options);
    }

    protected queryOrderBy(query: SelectQueryBuilder<DealEntity>, orderBy?: DealOrderType) {
        switch (orderBy) {
            case DealOrderType.CREATED:
                return query.orderBy(`${this.repository.getQBName()}.createdAt`, 'DESC');
            case DealOrderType.UPDATED:
                return query.orderBy(`${this.repository.getQBName()}.updatedAt`, 'DESC');
            case DealOrderType.ENDED:
                return query.orderBy(`${this.repository.getQBName()}.endedAt`, 'DESC');
            case DealOrderType.CUSTOM:
                return query.orderBy(`${this.repository.getQBName()}.customOrder`, 'ASC');
            default:
                return query
                    .addOrderBy(`${this.repository.getQBName()}.customOrder`, 'ASC')
                    .orderBy(`${this.repository.getQBName()}.createdAt`, 'DESC')
                    .addOrderBy(`${this.repository.getQBName()}.updatedAt`, 'DESC');
        }
    }
}
