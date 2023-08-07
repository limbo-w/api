import { OneToOne, JoinColumn, OneToMany } from 'typeorm';

import { ConfigureFactory } from '@/modules/core/types';
import { defaultMediaConfig } from '@/modules/media/helpers';
import { MediaConfig } from '@/modules/media/types';
import { BannerEntity, BrandEntity, DealEntity, StoreEntity } from '@/modules/shop/entities';

export const media: ConfigureFactory<MediaConfig> = {
    register: () => ({
        relations: [
            {
                column: 'brand',
                relation: OneToOne(
                    () => BrandEntity,
                    (brand) => brand.logo,
                    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
                ),
                others: [JoinColumn()],
            },
            {
                column: 'deal',
                relation: OneToOne(
                    () => DealEntity,
                    (deal) => deal.image,
                    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
                ),
                others: [JoinColumn()],
            },
            {
                column: 'banner',
                relation: OneToOne(
                    () => BannerEntity,
                    (banner) => banner.image,
                    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
                ),
                others: [JoinColumn()],
            },
            {
                column: 'store',
                relation: OneToMany(
                    () => StoreEntity,
                    (store) => store.logo,
                    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
                ),
                others: [JoinColumn()],
            },
            {
                column: 'backStore',
                relation: OneToMany(
                    () => StoreEntity,
                    (backStore) => backStore.background,
                    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
                ),
                others: [JoinColumn()],
            },
        ],
    }),
    defaultRegister: defaultMediaConfig,
};
