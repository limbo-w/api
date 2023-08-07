import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Depends } from '@/modules/restful/decorators';
import { ListQueryDto } from '@/modules/restful/dtos';
import { Guest } from '@/modules/user/decorators';

import { BannerService } from '../services';
import { ShopModule } from '../shop.module';

@ApiTags('Banner查询')
@Depends(ShopModule)
@Controller('banners')
export class BannerController {
    constructor(protected bannerService: BannerService) {}

    @Get()
    @ApiOperation({ summary: '查询Banner数据' })
    @Guest()
    async list(@Query() options: ListQueryDto) {
        return this.bannerService.paginate({ ...options });
    }
}
