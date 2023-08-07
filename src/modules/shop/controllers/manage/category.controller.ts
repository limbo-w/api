import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { PermissionAction } from '@/modules/rbac/constants';

import { simpleCurdOption } from '@/modules/rbac/helpers';
import { BaseController } from '@/modules/restful/base.controller';
import { Crud, Depends } from '@/modules/restful/decorators';

import { PermissionChecker } from '../../../rbac/types';
import { ManageCreateCategoryDto, ManageUpdateCategoryDto } from '../../dtos';
import { CategoryEntity } from '../../entities';
import { CategoryService } from '../../services';
import { ShopModule } from '../../shop.module';

const permissions: PermissionChecker[] = [
    async (ab) => ab.can(PermissionAction.MANAGE, CategoryEntity.name),
];
@ApiTags('分类管理')
@ApiBearerAuth()
@Depends(ShopModule)
@Crud({
    id: 'category',
    enabled: [
        { name: 'list', option: simpleCurdOption(permissions, '分类查询,以分页模式展示') },
        { name: 'detail', option: simpleCurdOption(permissions, '分类详情') },
        { name: 'store', option: simpleCurdOption(permissions, '添加分类') },
        { name: 'update', option: simpleCurdOption(permissions, '修改分类信息') },
        { name: 'delete', option: simpleCurdOption(permissions, '删除分类,支持批量删除') },
    ],
    dtos: {
        store: ManageCreateCategoryDto,
        update: ManageUpdateCategoryDto,
    },
})
@Controller('categories')
export class CategoryManageController extends BaseController<CategoryService> {
    constructor(protected service: CategoryService) {
        super(service);
    }
}
