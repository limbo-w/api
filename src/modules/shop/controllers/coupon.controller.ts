import { Controller, Get } from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Configure } from '@/modules/core/configure';
import { CouponConfig } from '@/modules/shop/types';

import { Guest } from '@/modules/user/decorators';

@ApiTags('优惠券与折扣')
@Controller('coupon')
export class CouponController {
    constructor(protected configure: Configure) {}

    @Get()
    @ApiOperation({ summary: '获取优惠券与折扣设置' })
    @Guest()
    async info() {
        return this.configure.get<CouponConfig>('coupon');
    }
}
