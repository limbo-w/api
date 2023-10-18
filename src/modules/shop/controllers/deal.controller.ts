import { Controller, Get, Param, ParseUUIDPipe, Patch, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { pick } from 'lodash';

import { SelectQueryBuilder } from 'typeorm';

import { ClassToPlain } from '@/modules/core/types';
import { Depends } from '@/modules/restful/decorators';
import { Guest, ReqUser } from '@/modules/user/decorators';

import { UserEntity } from '@/modules/user/entities';

import { QueryDealDto } from '../dtos';
import { DealEntity } from '../entities';
import { DealService } from '../services';
import { ShopModule } from '../shop.module';

// import {SelectQueryBuilder} from 'typeorm';
// import { DealEntity } from '../entities';

@ApiTags('商品操作')
@Depends(ShopModule)
@Controller('deals')
export class DealController {
    constructor(protected dealService: DealService) {}

    @Get()
    @ApiOperation({ summary: '查询商品列表,并分页' })
    @Guest()
    async list(@Query() query: QueryDealDto) {
        const options = pick(query, [
            'category',
            'store',
            'brand',
            'isTop',
            'page',
            'limit',
            'search',
        ]);
        return this.dealService.paginate(
            options,
            async (subQuery: SelectQueryBuilder<DealEntity>) => {
                return subQuery.andWhere('deal.show = :show', { show: true });
            },
        );
        // return this.dealService.paginate(options);
    }

    @Patch('favorite/:id')
    @ApiOperation({ summary: '收藏一个商品' })
    @ApiBearerAuth()
    async favorite(
        @ReqUser() user: ClassToPlain<UserEntity>,
        @Param('id', new ParseUUIDPipe())
        id: string,
    ) {
        return this.dealService.favorite(id, user);
    }

    @Get('pusheds')
    @ApiOperation({ summary: '获取最新推送的商品' })
    @ApiBearerAuth()
    async pusheds() {
        return this.dealService.getPushed();
    }
}
