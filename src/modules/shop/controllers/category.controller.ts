import { Controller, Get } from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Depends } from '@/modules/restful/decorators';
import { Guest } from '@/modules/user/decorators';

import { CategoryService } from '../services';
import { ShopModule } from '../shop.module';

@ApiTags('分类查询')
@Depends(ShopModule)
@Controller('categories')
export class CategoryController {
    constructor(protected categoryService: CategoryService) {}

    @Get()
    @ApiOperation({ summary: '查询所有分类' })
    @Guest()
    async list() {
        return this.categoryService.list();
    }
}
