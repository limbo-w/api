import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsDefined, IsUUID } from 'class-validator';

import { DtoValidation } from '@/modules/core/decorators';
import { IsModelExist } from '@/modules/database/constraints';

import { CategoryEntity } from '../../entities';

import { ManageCreateCategoryDto } from './create-category.dto';

@DtoValidation({ groups: ['update'] })
export class ManageUpdateCategoryDto extends PartialType(ManageCreateCategoryDto) {
    @ApiProperty({
        description: '待更新的分类ID',
    })
    @IsModelExist(CategoryEntity, {
        groups: ['update'],
        message: 'the category not exists',
    })
    @IsUUID(undefined, { groups: ['update'], message: 'category uuid format is error' })
    @IsDefined({ groups: ['update'], message: 'category uuid format be specify' })
    id!: string;
}
