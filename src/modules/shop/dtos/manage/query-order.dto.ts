import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

import { DtoValidation } from '@/modules/core/decorators';
import { IsModelExist } from '@/modules/database/constraints';
import { ListQueryDto } from '@/modules/restful/dtos';
import { UserEntity } from '@/modules/user/entities';

import { BrandEntity, StoreEntity } from '../../entities';

@DtoValidation({ type: 'query' })
export class ManageQueryOrderDto extends ListQueryDto {
    @ApiPropertyOptional({
        description: '根据联盟ID过滤订单',
    })
    @IsModelExist(StoreEntity, {
        message: 'store not exists',
    })
    @IsUUID(undefined, { message: 'store uuid format is error' })
    @IsOptional()
    store?: string;

    @ApiPropertyOptional({
        description: '根据品牌ID过滤订单',
    })
    @IsModelExist(BrandEntity, {
        message: 'brand not exists',
    })
    @IsUUID(undefined, { message: 'brand uuid format is error' })
    @IsOptional()
    brand?: string;

    @ApiPropertyOptional({
        description: '根据消费者ID过滤订单',
    })
    @IsModelExist(UserEntity, {
        message: 'user not exists',
    })
    @IsUUID(undefined, { message: 'user uuid format is error' })
    @IsOptional()
    user?: string;
}
