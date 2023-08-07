import { SelectQueryBuilder } from 'typeorm';

import { BaseRepository } from '@/modules/database/base';
import { CustomRepository } from '@/modules/database/decorators';

import { PushedEntity } from '../entities';

@CustomRepository(PushedEntity)
export class PushedRepository extends BaseRepository<PushedEntity> {
    protected qbName = 'pushed';

    buildBaseQuery(): SelectQueryBuilder<PushedEntity> {
        return this.createQueryBuilder(this.qbName)
            .leftJoinAndSelect(`${this.getQBName()}.deal`, 'deal')
            .addOrderBy(`${this.getQBName()}.createdAt`, 'DESC');
    }
}
