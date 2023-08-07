import { SelectQueryBuilder } from 'typeorm';

import { BaseRepository } from '@/modules/database/base';
import { CustomRepository } from '@/modules/database/decorators';

import { DealEntity } from '../entities';

@CustomRepository(DealEntity)
export class DealRepository extends BaseRepository<DealEntity> {
    protected qbName = 'deal';

    buildBaseQuery(): SelectQueryBuilder<DealEntity> {
        return this.createQueryBuilder(this.qbName)
            .leftJoinAndSelect(`${this.getQBName()}.pushed`, 'pushed')
            .leftJoinAndSelect(`${this.getQBName()}.image`, 'image')
            .leftJoinAndSelect(`${this.getQBName()}.categories`, 'categories')
            .leftJoinAndSelect(`${this.getQBName()}.brand`, 'brand')
            .leftJoinAndSelect(`${this.getQBName()}.favoriters`, 'favoriters')
            .leftJoinAndSelect('brand.logo', 'brand_logo')
            .leftJoinAndSelect(`${this.getQBName()}.store`, 'store');
    }
}
