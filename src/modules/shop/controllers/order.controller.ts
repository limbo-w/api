import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { In } from 'typeorm';

import { ClassToPlain } from '@/modules/core/types';
import { Permission } from '@/modules/rbac/decorators';
import { checkOwner } from '@/modules/rbac/helpers';
import { PermissionChecker } from '@/modules/rbac/types';

import { Depends } from '@/modules/restful/decorators';
import { ReqUser } from '@/modules/user/decorators';
import { UserEntity } from '@/modules/user/entities';

import { ListQueryDto } from '../../restful/dtos/list-query.dto';
import { OrderRepository } from '../repositories';
import { OrderService } from '../services';
import { ShopModule } from '../shop.module';

const ownerChecker: PermissionChecker = async (ab, ref, request) =>
    checkOwner(
        ab,
        async (items) =>
            ref.get(OrderRepository, { strict: false }).find({
                relations: ['user'],
                where: { id: In(items) },
            }),
        request,
    );

@ApiTags('订单查询')
@ApiBearerAuth()
@Depends(ShopModule)
@Controller('orders')
export class OrderController {
    constructor(protected orderService: OrderService) {}

    @Get()
    @ApiOperation({ summary: '查询订单,支持分页' })
    @Permission(ownerChecker)
    async list(@ReqUser() user: ClassToPlain<UserEntity>, @Query() options: ListQueryDto) {
        return this.orderService.paginate({ ...options, user: user.id });
    }
}
