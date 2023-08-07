import { BaseRepository } from '@/modules/database/base';
import { CustomRepository } from '@/modules/database/decorators';

import { BrandEntity } from '../entities';

@CustomRepository(BrandEntity)
export class BrandRepository extends BaseRepository<BrandEntity> {
    protected qbName = 'brand';

    buildBaseQuery() {
        return this.createQueryBuilder(this.qbName)
            .leftJoinAndSelect(`${this.qbName}.logo`, 'logo')
            .addOrderBy(`${this.qbName}.name`); // 暂时写死name排序
    }
}
