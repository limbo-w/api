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
import { SearchListQueryDto } from '@/modules/restful/dtos/search-list-query.dto';
import { ReqUser } from '@/modules/user/decorators';
import { UserEntity } from '@/modules/user/entities';

import { simpleCurdOption } from '../../../rbac/helpers';
import { ManageCreateBrandDto } from '../../dtos';
import { ManageUpdateBrandDto } from '../../dtos/manage/update-brand.dto';
import { BrandEntity } from '../../entities/brand.entity';
import { BrandService } from '../../services';
import { ShopModule } from '../../shop.module';

const permissions: PermissionChecker[] = [
    async (ab) => ab.can(PermissionAction.MANAGE, BrandEntity.name),
];
@ApiTags('品牌管理')
@ApiBearerAuth()
@Depends(ShopModule, MediaModule)
@Crud({
    id: 'brand',
    enabled: [
        { name: 'list', option: simpleCurdOption(permissions, '品牌查询,以分页模式展示') },
        { name: 'detail', option: simpleCurdOption(permissions, '品牌详情') },
        { name: 'store', option: simpleCurdOption(permissions, '添加品牌') },
        { name: 'update', option: simpleCurdOption(permissions, '修改品牌信息') },
        { name: 'delete', option: simpleCurdOption(permissions, '删除品牌,支持批量删除') },
    ],
    dtos: {
        store: ManageCreateBrandDto,
        update: ManageUpdateBrandDto,
        list: SearchListQueryDto,
    },
})
@Controller('brands')
export class BrandManageController extends BaseController<BrandService> {
    constructor(
        protected service: BrandService,
        protected configure: Configure,
        protected mediaService: MediaService,
    ) {
        super(service);
    }

    @Post('logo')
    @ApiOperation({ summary: '上传品牌Logo' })
    @ApiConsumes('multipart/form-data')
    async uploadLogo(@Body() data: UploadFileDto, @ReqUser() user: ClassToPlain<UserEntity>) {
        return this.mediaService.upload({
            file: data.image,
            user,
            dir: 'brands',
        });
    }
}
