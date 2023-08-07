import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Configure } from '@/modules/core/configure';
import { ClassToPlain } from '@/modules/core/types';
import { MediaModule } from '@/modules/media/media.module';
import { MediaService } from '@/modules/media/services';
import { PermissionAction } from '@/modules/rbac/constants';

import { PermissionChecker } from '@/modules/rbac/types';
import { BaseController } from '@/modules/restful/base.controller';
import { Crud, Depends } from '@/modules/restful/decorators';
import { SearchListQueryDto } from '@/modules/restful/dtos/search-list-query.dto';
import { StoreEntity } from '@/modules/shop/entities';

import { ReqUser } from '@/modules/user/decorators';
import { UserEntity } from '@/modules/user/entities';

import { UploadFileDto } from '../../../media/dtos/upload.dto';
import { simpleCurdOption } from '../../../rbac/helpers';
import { ManageCreateStoreDto, ManageUpdateStoreDto } from '../../dtos';
import { StoreService } from '../../services';
import { ShopModule } from '../../shop.module';

const permissions: PermissionChecker[] = [
    async (ab) => ab.can(PermissionAction.MANAGE, StoreEntity.name),
];
@ApiTags('联盟管理')
@ApiBearerAuth()
@Depends(ShopModule, MediaModule)
@Crud({
    id: 'store',
    enabled: [
        { name: 'list', option: simpleCurdOption(permissions, '联盟查询,以分页模式展示') },
        { name: 'detail', option: simpleCurdOption(permissions, '联盟详情') },
        { name: 'store', option: simpleCurdOption(permissions, '添加联盟') },
        { name: 'update', option: simpleCurdOption(permissions, '修改联盟信息') },
        { name: 'delete', option: simpleCurdOption(permissions, '删除联盟,支持批量删除') },
    ],
    dtos: {
        store: ManageCreateStoreDto,
        update: ManageUpdateStoreDto,
        list: SearchListQueryDto,
    },
})
@Controller('stores')
export class StoreManageController extends BaseController<StoreService> {
    constructor(
        protected service: StoreService,
        protected configure: Configure,
        protected mediaService: MediaService,
    ) {
        super(service);
    }

    @Post('logo')
    @ApiOperation({ summary: '上传联盟Logo' })
    @ApiConsumes('multipart/form-data')
    async uploadLogo(@Body() data: UploadFileDto, @ReqUser() user: ClassToPlain<UserEntity>) {
        return this.mediaService.upload({
            file: data.image,
            user,
            dir: 'stores',
        });
    }
}
