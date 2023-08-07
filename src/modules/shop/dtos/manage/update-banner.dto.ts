import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsDefined, IsUUID } from 'class-validator';

import { DtoValidation } from '@/modules/core/decorators';
import { IsModelExist } from '@/modules/database/constraints';

import { BannerEntity } from '../../entities';

import { ManageCreateBannerDto } from './create-banner.dto';

@DtoValidation({ groups: ['update'] })
export class ManageUpdateBannerDto extends PartialType(ManageCreateBannerDto) {
    @ApiProperty({
        description: '待更新的banner ID',
    })
    @IsModelExist(BannerEntity, {
        groups: ['update'],
        message: 'the banner not exists',
    })
    @IsUUID(undefined, { groups: ['update'], message: 'banner uuid format is error' })
    @IsDefined({ groups: ['update'], message: 'banner uuid format be specify' })
    id!: string;
}
