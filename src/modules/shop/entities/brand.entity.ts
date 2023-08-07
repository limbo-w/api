import { Exclude, Expose } from 'class-transformer';
import {
    BaseEntity,
    Column,
    Entity,
    Index,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { MediaEntity } from '@/modules/media/entities';

import { DealEntity } from './deal.entity';
import { OrderEntity } from './order.entity';

@Exclude()
@Entity('shop_brands')
export class BrandEntity extends BaseEntity {
    @Expose()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Expose()
    @Index({ fulltext: true })
    @Column({ comment: 'brand name' })
    name!: string;

    @Expose()
    @OneToOne(() => MediaEntity, (logo) => logo.brand, { nullable: true, cascade: true })
    logo?: MediaEntity;

    @OneToMany((type) => DealEntity, (deal) => deal.brand, {
        cascade: true,
    })
    deals!: DealEntity[];

    @OneToMany(() => OrderEntity, (order) => order.brand, { cascade: true })
    orders: OrderEntity[];
}
