import { ApiPropertyOptional } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

import { DtoValidation } from '@/modules/core/decorators';
import { tNumber } from '@/modules/core/helpers';

@DtoValidation({})
export class UpdateCouponDto {
    @ApiPropertyOptional({ description: '每张优惠券价值', type: [Number], minimum: 0 })
    @Transform(({ value }) => tNumber(value))
    @Min(0, {
        message: 'conpou value can not less then $constraint1',
    })
    @IsNumber(undefined)
    @IsOptional()
    value?: number;

    @ApiPropertyOptional({ description: '新注册用户赠送金额', minimum: 0 })
    @Transform(({ value }) => tNumber(value))
    @Min(0, { message: 'bonus amount for new user must exceed 0' })
    @IsNumber(undefined)
    @IsOptional()
    register?: number;

    @ApiPropertyOptional({ description: '每次消费赠送百分比', minimum: 0 })
    @Transform(({ value }) => tNumber(value))
    @Min(0, { message: 'bonus amount for every consume must exceed 0' })
    @IsNumber(undefined)
    @IsOptional()
    consume?: number;
}
