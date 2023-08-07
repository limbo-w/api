import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, MaxLength, Min } from 'class-validator';

import { DtoValidation } from '@/modules/core/decorators';
import { tNumber } from '@/modules/core/helpers';
import { IsUnique, IsUniqueExist } from '@/modules/database/constraints';

import { CategoryEntity } from '../../entities';

@DtoValidation({ groups: ['create'] })
export class ManageCreateCategoryDto {
    @ApiProperty({
        description: '分类名称',
        maxLength: 25,
        uniqueItems: true,
    })
    @IsUnique(
        { entity: CategoryEntity },
        {
            groups: ['create'],
            message: 'category must be unique',
        },
    )
    @IsUniqueExist(
        { entity: CategoryEntity },
        {
            groups: ['update'],
            message: 'category must be unique',
        },
    )
    @MaxLength(25, {
        always: true,
        message: 'category name length cannot exceed $constraint1',
    })
    @IsNotEmpty({ groups: ['create'], message: 'category name cannot be empty' })
    @IsOptional({ groups: ['update'] })
    name!: string;

    @ApiPropertyOptional({
        description: 'the icon name of category',
        maxLength: 25,
    })
    @MaxLength(100, {
        always: true,
        message: 'category icon name length cannot exceed $constraint1',
    })
    @IsOptional({ always: true })
    icon?: string;

    @ApiPropertyOptional({
        description: '分类排序',
        type: Number,
        minimum: 0,
    })
    @Min(0, { message: 'order number must exceed 0', always: true })
    @IsNumber(undefined, { message: 'order type must be number', always: true })
    @Transform(({ value }) => tNumber(value))
    @IsOptional({ always: true })
    customOrder?: number;
}
