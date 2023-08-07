import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsDefined, IsUUID } from 'class-validator';

import { DtoValidation } from '@/modules/core/decorators';
import { IsModelExist } from '@/modules/database/constraints';

import { BrandEntity } from '../../entities';

import { ManageCreateBrandDto } from './create-brand.dto';

@DtoValidation({ groups: ['update'] })
export class ManageUpdateBrandDto extends PartialType(ManageCreateBrandDto) {
    @ApiProperty({
        description: '待更新的品牌ID',
    })
    @IsModelExist(BrandEntity, {
        groups: ['update'],
        message: 'the category not exists',
    })
    @IsUUID(undefined, { groups: ['update'], message: 'brand uuid format is error' })
    @IsDefined({ groups: ['update'], message: 'brand uuid format be specify' })
    id!: string;
}
