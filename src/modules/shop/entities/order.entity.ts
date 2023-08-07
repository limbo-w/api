import { Exclude, Expose, Type } from 'class-transformer';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from '@/modules/user/entities';

import { BrandEntity } from './brand.entity';
import { DealEntity } from './deal.entity';
import { StoreEntity } from './store.entity';

@Exclude()
@Entity('shop_orders')
export class OrderEntity extends BaseEntity {
    @Expose()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Expose()
    @Column({ comment: 'order number' })
    numerical: string;

    @Expose()
    @Column({ type: 'float', comment: 'amount of consumption' })
    amount: number;

    @Expose()
    @Column({ type: 'boolean', comment: 'false is padding, true is reject', default: false })
    status?: boolean;

    @Expose()
    @Type(() => Date)
    @CreateDateColumn({
        comment: 'created at time',
    })
    createdAt!: Date;

    @Expose()
    @ManyToOne(() => BrandEntity, (brand) => brand.orders, { nullable: true, onDelete: 'SET NULL' })
    brand: BrandEntity;

    @Expose()
    @ManyToOne(() => DealEntity, (deal) => deal.orders, { nullable: true, onDelete: 'SET NULL' })
    deal: DealEntity;

    @Expose()
    @ManyToOne((type) => StoreEntity, (store) => store.orders, {
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    store!: StoreEntity;

    @Expose()
    @ManyToOne((type) => UserEntity, (user) => user.orders, {
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    user!: UserEntity;
}
