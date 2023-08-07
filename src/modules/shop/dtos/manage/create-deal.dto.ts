import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    ArrayMinSize,
    IsArray,
    IsBoolean,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsUUID,
    MaxLength,
    Min,
} from 'class-validator';

import { DtoValidation } from '@/modules/core/decorators';
import { tBoolean, tNumber } from '@/modules/core/helpers';
import { IsModelExist } from '@/modules/database/constraints';
import { MediaEntity } from '@/modules/media/entities';

import { BrandEntity, StoreEntity } from '../../entities';

@DtoValidation({ groups: ['create'] })
export class ManageCreateDealDto {
    @ApiProperty({ description: '商品名称', maxLength: 255 })
    @MaxLength(255, {
        always: true,
        message: 'deal title length cannot exceed $constraint1',
    })
    @IsNotEmpty({ groups: ['create'], message: 'deal title length cannot be empty' })
    @IsOptional({ groups: ['update'] })
    title!: string;

    @ApiProperty({ description: '商品描述' })
    @IsNotEmpty({ groups: ['create'], message: 'deal description cannot be empty' })
    @IsOptional({ groups: ['update'] })
    description!: string;

    @ApiProperty({ description: '商品链接', maxLength: 255 })
    @MaxLength(255, {
        always: true,
        message: 'deal link length cannot exceed $constraint1',
    })
    @IsNotEmpty({ groups: ['create'], message: 'deal link length cannot be empty' })
    @IsOptional({ groups: ['update'] })
    link!: string;

    @ApiPropertyOptional({ description: '关键字', type: [String], maxLength: 20 })
    @MaxLength(20, {
        each: true,
        always: true,
        message: 'every keword length cannot excced $constraint1',
    })
    @IsOptional({ always: true })
    keywords?: string[];

    @ApiPropertyOptional({ description: '商品原价', minimum: 0 })
    @Transform(({ value }) => tNumber(value))
    @Min(0, { always: true, message: 'oldPrice must exceed 0' })
    @IsNumber(undefined, { always: true })
    @IsOptional({ always: true })
    oldPrice?: number;

    @ApiProperty({ description: '商品当前价格', minimum: 0 })
    @Transform(({ value }) => tNumber(value))
    @Min(0, { always: true, message: 'price must exceed 0' })
    @IsNumber(undefined, { always: true })
    @IsOptional({ always: true })
    price!: number;

    @ApiProperty({ description: '活动结束时间', type: Date })
    @IsDateString({ strict: true }, { always: true })
    @IsNotEmpty({ groups: ['create'], message: 'deal end time cannot be empty' })
    @IsOptional({ groups: ['update'] })
    endedAt!: Date;

    @ApiPropertyOptional({ description: '是否首页置顶', type: Boolean })
    @Transform(({ value }) => tBoolean(value))
    @IsBoolean()
    @IsOptional()
    isTop?: boolean;

    @ApiPropertyOptional({
        description: '自定义排序',
        type: Number,
        minimum: 0,
        default: 0,
    })
    @Transform(({ value }) => tNumber(value))
    @Min(0, { always: true, message: 'order value must exceed 0' })
    @IsNumber(undefined, { always: true })
    @IsOptional({ always: true })
    customOrder = 0;

    @ApiProperty({
        description: '评论所属分类ID数组',
    })
    @IsArray()
    @ArrayMinSize(1)
    @IsNotEmpty({ message: 'deal category must be specify' })
    categories!: string[];

    @ApiProperty({
        description: '评论所属联盟ID',
    })
    @IsModelExist(StoreEntity, {
        always: true,
        message: 'the store not exists',
    })
    @IsUUID(undefined, {
        always: true,
        message: 'store uuid format is error',
    })
    @IsNotEmpty({ groups: ['create'], message: 'deal store must be specify' })
    @IsOptional({ groups: ['update'] })
    store!: string;

    @ApiProperty({
        description: '评论所属品牌ID',
    })
    @IsModelExist(BrandEntity, {
        always: true,
        message: 'the brand not exists',
    })
    @IsUUID(undefined, {
        always: true,
        message: 'brand uuid format is error',
    })
    @IsNotEmpty({ groups: ['create'], message: 'deal brand must be specify' })
    @IsOptional({ groups: ['update'] })
    brand!: string;

    @ApiProperty({
        description: '封面图ID',
    })
    @IsModelExist(MediaEntity, { always: true, message: '图片不存在' })
    @IsUUID(undefined, { message: 'uuid format is error' })
    @IsNotEmpty({ groups: ['create'], message: 'image cannot be empty' })
    @IsOptional({ groups: ['update'] })
    image!: string;
}
