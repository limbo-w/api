import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID, MaxLength, Min } from 'class-validator';

import { DtoValidation } from '@/modules/core/decorators';
import { tNumber } from '@/modules/core/helpers';
import { IsModelExist, IsUnique, IsUniqueExist } from '@/modules/database/constraints';

import { MediaEntity } from '@/modules/media/entities';

import { StoreEntity } from '../../entities';

@DtoValidation({ groups: ['create'] })
export class ManageCreateStoreDto {
    @ApiProperty({
        description: '联盟名称',
        maxLength: 100,
        uniqueItems: true,
    })
    @IsUnique(
        { entity: StoreEntity },
        {
            groups: ['create'],
            message: 'store must be unique',
        },
    )
    @IsUniqueExist(
        { entity: StoreEntity },
        {
            groups: ['update'],
            message: 'store must be unique',
        },
    )
    @MaxLength(100, {
        always: true,
        message: 'store name length cannot exceed $constraint1',
    })
    @IsNotEmpty({ groups: ['create'], message: 'store name cannot be empty' })
    @IsOptional({ groups: ['update'] })
    name!: string;

    @ApiProperty({
        description: '联盟脚本地址',
        maxLength: 255,
    })
    @MaxLength(255, {
        always: true,
        message: 'store script url string length cannot exceed $constraint1',
    })
    @IsNotEmpty({ groups: ['create'], message: 'store script cannot be empty' })
    @IsOptional({ groups: ['update'] })
    script!: string;

    @ApiProperty({
        description: '返现配置',
        type: Number,
        minimum: 0,
        default: 0,
    })
    @Transform(({ value }) => tNumber(value))
    @Min(0, { always: true, message: 'order value must exceed 0' })
    @IsNumber(undefined, { always: true })
    @IsOptional({ always: true })
    cashbackSetting!: number;

    @ApiProperty({
        description: 'country',
        maxLength: 255,
    })
    @MaxLength(255, {
        always: true,
        message: 'store country string length cannot exceed $constraint1',
    })
    @IsNotEmpty({ groups: ['create'], message: 'store country cannot be empty' })
    @IsOptional({ groups: ['update'] })
    country!: string;

    @ApiProperty({
        description: 'allianceName',
        maxLength: 255,
    })
    @MaxLength(255, {
        always: true,
        message: 'store allianceName string length cannot exceed $constraint1',
    })
    @IsNotEmpty({ groups: ['create'], message: 'store allianceName cannot be empty' })
    @IsOptional({ groups: ['update'] })
    allianceName!: string;

    @ApiProperty({
        description: 'urls',
        maxLength: 255,
    })
    @MaxLength(255, {
        always: true,
        message: 'store urls string length cannot exceed $constraint1',
    })
    @IsNotEmpty({ groups: ['create'], message: 'urls cannot be empty' })
    @IsOptional({ groups: ['update'] })
    url!: string;

    @ApiProperty({
        description: 'logo',
    })
    @IsModelExist(MediaEntity, {
        always: true,
        message: 'the media not exists',
    })
    @IsUUID(undefined, {
        always: true,
        message: 'media uuid format is error',
    })
    @IsNotEmpty({ groups: ['create'], message: 'logo must be specify' })
    @IsOptional({ groups: ['update'] })
    logo!: string;

    @ApiProperty({
        description: 'backgound',
    })
    @IsModelExist(MediaEntity, {
        always: true,
        message: 'the media not exists',
    })
    @IsUUID(undefined, {
        always: true,
        message: 'media uuid format is error',
    })
    @IsNotEmpty({ groups: ['create'], message: 'backgound must be specify' })
    @IsOptional({ groups: ['update'] })
    background!: string;
}
