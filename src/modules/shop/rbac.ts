import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { DealEntity } from '@/modules/shop/entities';

import { PermissionAction, SystemRoles } from '../rbac/constants';
import { RbacResolver } from '../rbac/rbac.resolver';

import { BrandEntity, CategoryEntity, StoreEntity } from './entities';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class ShopRbac implements OnModuleInit {
    constructor(private moduleRef: ModuleRef) {}

    onModuleInit() {
        const resolver = this.moduleRef.get(RbacResolver, { strict: false });
        resolver.addPermissions([
            {
                name: 'category.manage',
                rule: {
                    action: PermissionAction.MANAGE,
                    subject: CategoryEntity,
                },
            },
            {
                name: 'store.manage',
                rule: {
                    action: PermissionAction.MANAGE,
                    subject: StoreEntity,
                },
            },
            {
                name: 'brand.manage',
                rule: {
                    action: PermissionAction.MANAGE,
                    subject: BrandEntity,
                },
            },
            {
                name: 'deal.manage',
                rule: {
                    action: PermissionAction.MANAGE,
                    subject: DealEntity,
                },
            },
            {
                name: 'order.manage',
                rule: {
                    action: PermissionAction.MANAGE,
                    subject: OrderEntity,
                },
            },
            {
                name: 'order.owner',
                rule: {
                    action: PermissionAction.OWNER,
                    subject: OrderEntity,
                    conditions: (user) => ({
                        'user.id': user.id,
                    }),
                },
            },
        ]);
        resolver.addRoles([
            {
                name: SystemRoles.USER,
                permissions: ['order.owner'],
            },
            {
                name: 'shop-manager',
                label: 'shop manager',
                description: 'manage shop module',
                permissions: [
                    'category.manage',
                    'store.manage',
                    'brand.manage',
                    'deal.manage',
                    'order.manage',
                ],
            },
        ]);
    }
}
