import { Injectable, ForbiddenException } from '@nestjs/common';

import { isNil } from 'lodash';
import { SelectQueryBuilder } from 'typeorm';
import xlsx from 'node-xlsx';

import { getTime } from '@/modules/core/helpers';
import { BaseService } from '@/modules/database/base';

import { ExportOrderDto, QueryDealDto } from '../dtos';
import { OrderEntity } from '../entities';
import { OrderRepository } from '../repositories';
import { QueryHook } from '@/modules/database/types';

type FindParams = {
    [key in keyof Omit<QueryDealDto, 'limit' | 'page'>]: QueryDealDto[key];
};

@Injectable()
export class OrderService extends BaseService<OrderEntity, OrderRepository> {
    constructor(protected repository: OrderRepository) {
        super(repository);
    }

    async exportOrder(options: ExportOrderDto) {
        const start = isNil(options.start) ? null : getTime({ date: options.start });
        let end = isNil(options.end) ? null : getTime({ date: options.end });
        if (!isNil(start) && !isNil(end)) {
            if (end.isBefore(start)) {
                throw new ForbiddenException(
                    'Orders can not been export,because start time can not after end time',
                );
            }
        }

        const qb = this.repository.buildBaseQuery();
        if (!isNil(start)) {
            qb.andWhere(`${this.repository.getQBName()}.createdAt >= :start`, {
                start: end.format('YYYY-MM-DD HH:mm:ss'),
            });
        }
        if (!isNil(end)) {
            end = end.add(1, 'day').subtract(1, 'second');
            qb.andWhere(`${this.repository.getQBName()}.createdAt <= :end`, {
                end: end.format('YYYY-MM-DD HH:mm:ss'),
            });
        }
        const items = await qb.getMany();
        const data = [
            ['ID', 'Numberic', 'User', 'Store', 'Brand', 'Date', 'Order Price', 'Status'],
            ...items.map((item) => [
                item.id,
                item.numerical,
                `${item.user.username}${item.user.email ? `/${item.user.email}` : ''}`,
                `${item.store.name}`,
                `${item.brand.name}`,
                `${item.createdAt}`,
                `${item.amount}`,
                item.status ? 'Reject' : 'Pedding',
            ]),
        ];
        const name = getTime().format('YYYYMMDDHHmmss');
        const file = xlsx.build([{ name, data, options: {} }]);
        return { name: `${name}.xlsx`, file };
    }

    protected async buildListQuery(
        queryBuilder: SelectQueryBuilder<OrderEntity>,
        options: FindParams,
        callback?: QueryHook<OrderEntity>,
    ) {
        const { store, brand } = options;
        let qb = queryBuilder;
        if (!isNil(store))
            qb.andWhere({
                store,
            });

        if (!isNil(brand))
            qb.andWhere({
                brand,
            });

        if (callback) qb = await callback(qb);
        return super.buildListQuery(qb, options);
    }
}
