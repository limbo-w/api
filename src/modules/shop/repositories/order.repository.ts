import { SelectQueryBuilder } from 'typeorm';

import { BaseRepository } from '@/modules/database/base';
import { CustomRepository } from '@/modules/database/decorators';

import { OrderEntity } from '../entities';

@CustomRepository(OrderEntity)
export class OrderRepository extends BaseRepository<OrderEntity> {
    protected qbName = 'order';

    buildBaseQuery(): SelectQueryBuilder<OrderEntity> {
        return this.createQueryBuilder(this.qbName)
            .leftJoinAndSelect(`${this.qbName}.deal`, 'deal')
            .leftJoinAndSelect(`${this.qbName}.store`, 'store')
            .leftJoinAndSelect(`${this.qbName}.brand`, 'brand')
            .leftJoinAndSelect(`${this.qbName}.user`, 'user')
            .addOrderBy(`${this.qbName}.createdAt`, 'DESC');
    }
}
