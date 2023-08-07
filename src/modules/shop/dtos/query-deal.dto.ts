import { ApiPropertyOptional } from '@nestjs/swagger';

import { Transform } from 'class-transformer';

import { IsBoolean, IsEnum, IsOptional, IsUUID } from 'class-validator';

import { DtoValidation } from '@/modules/core/decorators';
import { tBoolean } from '@/modules/core/helpers';
import { IsModelExist } from '@/modules/database/constraints';
import { ListQueryDto } from '@/modules/restful/dtos';

import { DealOrderType } from '../constants';
import { BrandEntity, CategoryEntity, StoreEntity } from '../entities';

@DtoValidation({ type: 'query' })
export class QueryDealDto extends ListQueryDto {
    @ApiPropertyOptional({
        description: '通过分类ID过滤商品',
    })
    @IsModelExist(CategoryEntity, {
        message: 'category not exists',
    })
    @IsUUID(undefined, { message: 'category uuid format is error' })
    @IsOptional()
    category?: string;

    @ApiPropertyOptional({
        description: '搜索关键字,匹配分类,品牌,商品标题,商品描述等',
    })
    @IsOptional()
    search?: string;

    @ApiPropertyOptional({
        description: '过联盟ID过滤商品',
    })
    @IsModelExist(StoreEntity, {
        message: 'store not exists',
    })
    @IsUUID(undefined, { message: 'store uuid format is error' })
    @IsOptional()
    store?: string;

    @ApiPropertyOptional({
        description: '通过品牌ID过滤商品',
    })
    @IsModelExist(BrandEntity, {
        message: 'brand not exists',
    })
    @IsUUID(undefined, { message: 'brand uuid format is error' })
    @IsOptional()
    brand?: string;

    @ApiPropertyOptional({
        description: '只显示首页置顶的商品',
        type: Boolean,
    })
    @Transform(({ value }) => tBoolean(value))
    @IsBoolean()
    @IsOptional()
    isTop?: boolean;

    @ApiPropertyOptional({ enum: DealOrderType, description: '商品排序规则' })
    @IsEnum(DealOrderType, {
        message: `order must be one of ${Object.values(DealOrderType).join(',')}`,
    })
    @IsOptional()
    declare orderBy?: DealOrderType;
}
