import { Injectable } from '@nestjs/common';

import { isNil } from 'lodash';

import { SelectQueryBuilder } from 'typeorm';

import { Configure } from '@/modules/core/configure';
import { BaseService } from '@/modules/database/base';

import { QueryHook } from '@/modules/database/types';
import { MediaRepository } from '@/modules/media/repositories';

import { SearchListQueryDto } from '@/modules/restful/dtos/search-list-query.dto';

import { ManageCreateStoreDto, ManageUpdateStoreDto } from '../dtos';
import { StoreEntity } from '../entities';
import { StoreRepository } from '../repositories';

type FindParams = {
    [key in keyof Omit<SearchListQueryDto, 'limit' | 'page'>]: SearchListQueryDto[key];
};

@Injectable()
export class StoreService extends BaseService<StoreEntity, StoreRepository> {
    constructor(
        protected repository: StoreRepository,
        protected configure: Configure,
        protected mediaRepository: MediaRepository,
    ) {
        super(repository);
    }

    async create({ logo, background, ...data }: ManageCreateStoreDto) {
        const item = await this.repository.save(
            {
                ...data,
                logo: await this.mediaRepository.findOneByOrFail({ id: logo }),
                background: await this.mediaRepository.findOneByOrFail({ id: background }),
            },
            { reload: true },
        );

        return this.detail(item.id);
    }

    async update({ id, logo, background, ...data }: ManageUpdateStoreDto) {
        const item = await this.detail(id);
        await this.repository.update(id, {
            ...data,
            logo: !isNil(logo)
                ? await this.mediaRepository.findOneByOrFail({ id: logo })
                : item.logo,
            background: !isNil(background)
                ? await this.mediaRepository.findOneByOrFail({ id: background })
                : item.background,
        });
        return this.detail(id);
    }

    protected async buildListQuery(
        queryBuilder: SelectQueryBuilder<StoreEntity>,
        options: FindParams,
        callback?: QueryHook<StoreEntity>,
    ) {
        const { search } = options;
        let qb = queryBuilder;
        if (!isNil(search)) {
            qb.andWhere('`name` LIKE :search', { search: `%${search}%` });
        }

        if (callback) qb = await callback(qb);
        return super.buildListQuery(qb, options);
    }
}
