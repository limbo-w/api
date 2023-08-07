import { Controller, Get, Post, Query, Res, StreamableFile } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { FastifyReply } from 'fastify';

import { PermissionAction } from '@/modules/rbac/constants';

import { Permission } from '@/modules/rbac/decorators';
import { PermissionChecker } from '@/modules/rbac/types';
import { BaseController } from '@/modules/restful/base.controller';
import { Crud, Depends } from '@/modules/restful/decorators';
import { OrderEntity } from '@/modules/shop/entities';

import { simpleCurdOption } from '../../../rbac/helpers';
import { ExportOrderDto } from '../../dtos/manage/export-order.dto';
import { ManageQueryOrderDto } from '../../dtos/manage/query-order.dto';
import { OrderService } from '../../services';
import { ShopModule } from '../../shop.module';

const permissions: PermissionChecker[] = [
    async (ab) => ab.can(PermissionAction.MANAGE, OrderEntity.name),
];
@ApiTags('订单管理')
@ApiBearerAuth()
@Depends(ShopModule)
@Crud({
    id: 'order',
    enabled: [{ name: 'list', option: simpleCurdOption(permissions, '订单查询,以分页模式展示') }],
    dtos: {
        list: ManageQueryOrderDto,
    },
})
@Controller('orders')
export class OrderManageController extends BaseController<OrderService> {
    constructor(protected service: OrderService) {
        super(service);
    }

    @Post('sync')
    @ApiOperation({ summary: '同步订单' })
    @Permission(...permissions)
    async Sync() {
        return true;
    }

    @Get('export')
    @ApiOperation({ summary: '导出订单' })
    @Permission(...permissions)
    async exportOrder(
        @Query() options: ExportOrderDto,
        @Res({ passthrough: true }) res: FastifyReply,
    ): Promise<StreamableFile> {
        const { file, name } = await this.service.exportOrder(options);
        res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.header('Content-Disposition', `attachment; filename="${name}"`);
        return new StreamableFile(file);
    }
}
