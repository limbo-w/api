import { Expose } from 'class-transformer';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { MediaEntity } from '@/modules/media/entities';

import { BannerEntity } from './banner.entity';

import { DealEntity } from './deal.entity';
import { OrderEntity } from './order.entity';

@Entity('shop_stores')
export class StoreEntity extends BaseEntity {
    @Expose()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Expose()
    @Column({ comment: 'store name' })
    name!: string;

    @Expose()
    @Column({ comment: 'store script' })
    script!: string;

    @Expose()
    @Column({ comment: '返现配置' })
    cashbackSetting!: number;

    @Expose()
    @Column({ comment: 'country' })
    country!: string;

    @Expose()
    @Column()
    allianceName!: string;

    @Expose()
    @Column()
    url!: string;

    @Expose()
    @ManyToOne(() => MediaEntity, (logo) => logo.store, { nullable: true, cascade: true })
    logo?: MediaEntity;

    @Expose()
    @ManyToOne(() => MediaEntity, (background) => background.backStore, {
        nullable: true,
        cascade: true,
    })
    background?: MediaEntity;

    @OneToMany((type) => DealEntity, (deal) => deal.store, {
        cascade: true,
    })
    deals!: DealEntity[];

    @OneToMany((type) => OrderEntity, (order) => order.store, {
        cascade: true,
    })
    orders!: OrderEntity[];

    @OneToMany((type) => BannerEntity, (banner) => banner.store, {
        cascade: true,
    })
    banners!: BannerEntity[];
}
