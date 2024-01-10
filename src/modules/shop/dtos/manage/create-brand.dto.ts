import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID, MaxLength } from 'class-validator';

import { DtoValidation } from '@/modules/core/decorators';
import { IsModelExist, IsUnique, IsUniqueExist } from '@/modules/database/constraints';
import { MediaEntity } from '@/modules/media/entities';

import { BrandEntity } from '../../entities';

@DtoValidation({ groups: ['create'] })
export class ManageCreateBrandDto {
    @ApiProperty({
        description: '品牌名称',
        maxLength: 50,
        uniqueItems: true,
    })
    @IsUnique(
        { entity: BrandEntity },
        {
            groups: ['create'],
            message: 'brand must be unique',
        },
    )
    @IsUniqueExist(
        { entity: BrandEntity },
        {
            groups: ['update'],
            message: 'brand must be unique',
        },
    )
    @MaxLength(25, {
        always: true,
        message: 'brand name length cannot exceed $constraint1',
    })
    @IsNotEmpty({ groups: ['create'], message: 'brand name cannot be empty' })
    @IsOptional({ groups: ['update'] })
    name!: string;

    @ApiProperty({
        description: 'Logo ID',
    })
    @IsModelExist(MediaEntity, { always: true, message: '图片不存在' })
    @IsUUID(undefined, { message: 'uuid format is error' })
    @IsNotEmpty({ groups: ['create'], message: 'image cannot be empty' })
    @IsOptional({ groups: ['update'] })
    logo!: string;
}
