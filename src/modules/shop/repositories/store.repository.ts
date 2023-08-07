import { BaseRepository } from '@/modules/database/base';
import { CustomRepository } from '@/modules/database/decorators';

import { StoreEntity } from '../entities';

@CustomRepository(StoreEntity)
export class StoreRepository extends BaseRepository<StoreEntity> {
    protected qbName = 'store';

    buildBaseQuery() {
        return this.createQueryBuilder(this.qbName)
            .leftJoinAndSelect(`${this.getQBName()}.logo`, 'logo')
            .leftJoinAndSelect(`${this.getQBName()}.background`, 'background')
            .addOrderBy(`${this.qbName}.name`); // 暂时写死name排序
    }
}
