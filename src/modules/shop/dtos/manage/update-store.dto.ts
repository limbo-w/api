import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsDefined, IsUUID } from 'class-validator';

import { DtoValidation } from '@/modules/core/decorators';
import { IsModelExist } from '@/modules/database/constraints';

import { StoreEntity } from '../../entities';

import { ManageCreateStoreDto } from './create-store.dto';

@DtoValidation({ groups: ['update'] })
export class ManageUpdateStoreDto extends PartialType(ManageCreateStoreDto) {
    @ApiProperty({
        description: '待更新的联盟ID',
    })
    @IsModelExist(StoreEntity, {
        groups: ['update'],
        message: 'the store not exists',
    })
    @IsUUID(undefined, { groups: ['update'], message: 'store uuid format is error' })
    @IsDefined({ groups: ['update'], message: 'store uuid format be specify' })
    id!: string;
}
