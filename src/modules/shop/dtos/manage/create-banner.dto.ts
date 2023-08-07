import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID, MaxLength, Min } from 'class-validator';

import { DtoValidation } from '@/modules/core/decorators';
import { tNumber } from '@/modules/core/helpers';
import { IsModelExist } from '@/modules/database/constraints';
import { MediaEntity } from '@/modules/media/entities';

import { StoreEntity } from '../../entities';

@DtoValidation({ groups: ['create'] })
export class ManageCreateBannerDto {
    @ApiProperty({
        description: 'banner备注',
        maxLength: 25,
        uniqueItems: true,
    })
    @MaxLength(255, {
        always: true,
        message: 'banner name length cannot exceed $constraint1',
    })
    @IsNotEmpty({ groups: ['create'], message: 'banner name cannot be empty' })
    @IsOptional({ groups: ['update'] })
    name!: string;

    @ApiProperty({
        description: 'banner跳转地址',
        maxLength: 255,
        uniqueItems: true,
    })
    @MaxLength(255, {
        always: true,
        message: 'banner link length cannot exceed $constraint1',
    })
    @IsNotEmpty({ groups: ['create'], message: 'banner link cannot be empty' })
    @IsOptional({ groups: ['update'] })
    link!: string;

    @ApiProperty({
        description: '折扣信息',
        maxLength: 255,
        uniqueItems: true,
    })
    @MaxLength(255, {
        always: true,
        message: 'banner discountInfo length cannot exceed $constraint1',
    })
    @IsNotEmpty({ groups: ['create'], message: 'banner discountInfo cannot be empty' })
    @IsOptional({ groups: ['update'] })
    discountInfo!: string;

    @ApiProperty({
        description: '图片',
    })
    @IsModelExist(MediaEntity, { always: true, message: '图片不存在' })
    @IsUUID(undefined, { message: 'uuid format is error' })
    @IsNotEmpty({ groups: ['create'], message: 'image cannot be empty' })
    @IsOptional({ groups: ['update'] })
    image!: string;

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
}
