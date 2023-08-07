import { SelectQueryBuilder } from 'typeorm';

import { BaseRepository } from '@/modules/database/base';
import { OrderType } from '@/modules/database/constants';
import { CustomRepository } from '@/modules/database/decorators';

import { BannerEntity } from '../entities';

@CustomRepository(BannerEntity)
export class BannerRepository extends BaseRepository<BannerEntity> {
    protected qbName = 'banner';

    protected orderBy = { name: 'customOrder', order: OrderType.ASC };

    buildBaseQuery(): SelectQueryBuilder<BannerEntity> {
        return this.getOrderByQuery(super.buildBaseQuery(), this.orderBy)
            .leftJoinAndSelect(`${this.getQBName()}.image`, 'image')
            .leftJoinAndSelect(`${this.getQBName()}.store`, 'store');
    }
}
