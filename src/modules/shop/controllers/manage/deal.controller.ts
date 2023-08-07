import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Configure } from '@/modules/core/configure';
import { ClassToPlain } from '@/modules/core/types';
import { MediaModule } from '@/modules/media/media.module';
import { MediaService } from '@/modules/media/services';
import { PermissionAction } from '@/modules/rbac/constants';

import { simpleCurdOption } from '@/modules/rbac/helpers';
import { PermissionChecker } from '@/modules/rbac/types';
import { BaseController } from '@/modules/restful/base.controller';
import { Crud, Depends } from '@/modules/restful/decorators';
import { DealEntity } from '@/modules/shop/entities';

import { ReqUser } from '@/modules/user/decorators';
import { UserEntity } from '@/modules/user/entities';

import { UploadFileDto } from '../../../media/dtos/upload.dto';
import { ManageCreateDealDto, ManageUpdateDealDto, QueryDealDto } from '../../dtos';
import { DealService } from '../../services';
import { ShopModule } from '../../shop.module';

const permissions: PermissionChecker[] = [
    async (ab) => ab.can(PermissionAction.MANAGE, DealEntity.name),
];
@ApiTags('商品管理')
@ApiBearerAuth()
@Depends(ShopModule, MediaModule)
@Crud({
    id: 'deal',
    enabled: [
        { name: 'list', option: simpleCurdOption(permissions, '商品查询,以分页模式展示') },
        { name: 'detail', option: simpleCurdOption(permissions, '商品详情') },
        { name: 'store', option: simpleCurdOption(permissions, '添加商品') },
        { name: 'update', option: simpleCurdOption(permissions, '修改商品信息') },
        { name: 'delete', option: simpleCurdOption(permissions, '删除商品,支持批量删除') },
    ],
    dtos: {
        store: ManageCreateDealDto,
        update: ManageUpdateDealDto,
        list: QueryDealDto,
    },
})
@Controller('deals')
export class DealManageController extends BaseController<DealService> {
    constructor(
        protected service: DealService,
        protected configure: Configure,
        protected mediaService: MediaService,
    ) {
        super(service);
    }

    @Post('image')
    @ApiOperation({ summary: '上传商品封面图' })
    @ApiConsumes('multipart/form-data')
    async uploadImage(@Body() data: UploadFileDto, @ReqUser() user: ClassToPlain<UserEntity>) {
        return this.mediaService.upload({
            file: data.image,
            user,
            dir: 'deals',
        });
    }
}
