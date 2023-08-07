import { Body, Controller, Post } from '@nestjs/common';

import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Configure } from '@/modules/core/configure';
import { ClassToPlain } from '@/modules/core/types';
import { UploadFileDto } from '@/modules/media/dtos';
import { MediaModule } from '@/modules/media/media.module';
import { MediaService } from '@/modules/media/services';
import { PermissionAction } from '@/modules/rbac/constants';

import { PermissionChecker } from '@/modules/rbac/types';
import { BaseController } from '@/modules/restful/base.controller';
import { Crud, Depends } from '@/modules/restful/decorators';
import { ReqUser } from '@/modules/user/decorators';
import { UserEntity } from '@/modules/user/entities';

import { simpleCurdOption } from '../../../rbac/helpers';
import { ManageCreateBannerDto } from '../../dtos/manage/create-banner.dto';
import { ManageUpdateBannerDto } from '../../dtos/manage/update-banner.dto';
import { BannerEntity } from '../../entities';
import { BannerService } from '../../services';
import { ShopModule } from '../../shop.module';

const permissions: PermissionChecker[] = [
    async (ab) => ab.can(PermissionAction.MANAGE, BannerEntity.name),
];
@ApiTags('Banner管理')
@ApiBearerAuth()
@Depends(ShopModule, MediaModule)
@Crud({
    id: 'banner',
    enabled: [
        { name: 'list', option: simpleCurdOption(permissions, 'banner查询,以分页模式展示') },
        { name: 'detail', option: simpleCurdOption(permissions, 'banner详情') },
        { name: 'store', option: simpleCurdOption(permissions, '添加banner') },
        { name: 'update', option: simpleCurdOption(permissions, '修改banner信息') },
        { name: 'delete', option: simpleCurdOption(permissions, '删除banner,支持批量删除') },
    ],
    dtos: {
        store: ManageCreateBannerDto,
        update: ManageUpdateBannerDto,
    },
})
@Controller('banner')
export class BannerManageController extends BaseController<BannerService> {
    constructor(
        protected service: BannerService,
        protected configure: Configure,
        protected mediaService: MediaService,
    ) {
        super(service);
    }

    @Post('image')
    @ApiOperation({ summary: '上传banner图片' })
    @ApiConsumes('multipart/form-data')
    async uploadLogo(@Body() data: UploadFileDto, @ReqUser() user: ClassToPlain<UserEntity>) {
        return this.mediaService.upload({
            file: data.image,
            user,
            dir: 'banners',
        });
    }
}
