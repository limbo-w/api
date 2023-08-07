import { SelectQueryBuilder } from 'typeorm';

import { BaseRepository } from '@/modules/database/base';
import { OrderType } from '@/modules/database/constants';
import { CustomRepository } from '@/modules/database/decorators';

import { CategoryEntity } from '../entities';

@CustomRepository(CategoryEntity)
export class CategoryRepository extends BaseRepository<CategoryEntity> {
    protected qbName = 'category';

    protected orderBy = { name: 'customOrder', order: OrderType.ASC };

    buildBaseQuery(): SelectQueryBuilder<CategoryEntity> {
        return this.getOrderByQuery(super.buildBaseQuery(), this.orderBy);
    }
}
