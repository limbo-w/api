import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsDefined, IsUUID } from 'class-validator';

import { DtoValidation } from '@/modules/core/decorators';
import { IsModelExist } from '@/modules/database/constraints';

import { DealEntity } from '../../entities';

import { ManageCreateDealDto } from './create-deal.dto';

@DtoValidation({ groups: ['update'] })
export class ManageUpdateDealDto extends PartialType(ManageCreateDealDto) {
    @ApiProperty({
        description: '待更新的商品ID',
    })
    @IsModelExist(DealEntity, {
        groups: ['update'],
        message: 'the deal not exists',
    })
    @IsUUID(undefined, { groups: ['update'], message: 'deal uuid format is error' })
    @IsDefined({ groups: ['update'], message: 'deal uuid format be specify' })
    id!: string;
}
