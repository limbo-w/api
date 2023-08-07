import { Body, Controller, Get, Post } from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Configure } from '@/modules/core/configure';
import { PermissionAction } from '@/modules/rbac/constants';
import { Permission } from '@/modules/rbac/decorators';
import { CouponConfig } from '@/modules/shop/types';

import { UpdateCouponDto } from '../../dtos/manage/update-coupon.dto';

@ApiTags('优惠券与折扣')
@ApiBearerAuth()
@Controller('coupon')
export class CouponController {
    constructor(protected configure: Configure) {}

    @Get()
    @ApiOperation({ summary: '获取优惠券与折扣设置' })
    @Permission(async (ab) => ab.can(PermissionAction.MANAGE, 'all'))
    async info() {
        return this.configure.get<CouponConfig>('coupon');
    }

    @Post()
    @ApiOperation({ summary: '设置优惠券与折扣' })
    @Permission(async (ab) => ab.can(PermissionAction.MANAGE, 'all'))
    async update(@Body() data: UpdateCouponDto) {
        const config = this.configure.get<CouponConfig>('coupon');
        this.configure.set('coupon', { ...config, ...data }, true);
        return this.info();
    }
}
