import { Injectable } from '@nestjs/common';

import { isNil } from 'lodash';

import { SelectQueryBuilder } from 'typeorm';

import { Configure } from '@/modules/core/configure';
import { BaseService } from '@/modules/database/base';

import { QueryHook } from '@/modules/database/types';
import { MediaRepository } from '@/modules/media/repositories';

import { SearchListQueryDto } from '@/modules/restful/dtos/search-list-query.dto';

import { ManageCreateBrandDto } from '../dtos';
import { ManageUpdateBrandDto } from '../dtos/manage/update-brand.dto';
import { BrandEntity } from '../entities';
import { BrandRepository } from '../repositories';

type FindParams = {
    [key in keyof Omit<SearchListQueryDto, 'limit' | 'page'>]: SearchListQueryDto[key];
};

@Injectable()
export class BrandService extends BaseService<BrandEntity, BrandRepository> {
    constructor(
        protected repository: BrandRepository,
        protected configure: Configure,
        protected mediaRepository: MediaRepository,
    ) {
        super(repository);
    }

    async create({ logo, ...data }: ManageCreateBrandDto) {
        const item = await this.repository.save(
            {
                ...data,
                logo: await this.mediaRepository.findOneByOrFail({ id: logo }),
            },
            { reload: true },
        );

        return this.detail(item.id);
    }

    async update({ id, logo, ...data }: ManageUpdateBrandDto) {
        const item = await this.detail(id);
        if (!isNil(logo)) {
            const oldLogo = item.logo;
            if ((!isNil(oldLogo) && oldLogo.id !== logo) || isNil(oldLogo)) {
                if (!isNil(oldLogo)) await this.mediaRepository.remove(oldLogo);
                const currentLogo = await this.mediaRepository.findOneByOrFail({ id: logo });
                currentLogo.brand = await this.repository.findOneByOrFail({ id });
                await this.mediaRepository.save(currentLogo);
            }
        }
        await this.repository.update(id, data);

        return this.detail(id);
    }

    protected async buildListQuery(
        queryBuilder: SelectQueryBuilder<BrandEntity>,
        options: FindParams,
        callback?: QueryHook<BrandEntity>,
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
