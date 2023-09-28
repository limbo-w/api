import { Exclude, Expose, Type } from 'class-transformer';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    AfterLoad,
} from 'typeorm';

import { MediaEntity } from '@/modules/media/entities';
import { PushedEntity } from '@/modules/shop/entities/pushed.entity';
import { UserEntity } from '@/modules/user/entities';

import { BrandEntity } from './brand.entity';

import { CategoryEntity } from './category.entity';
import { OrderEntity } from './order.entity';
import { StoreEntity } from './store.entity';

@Exclude()
@Entity('shop_deals')
export class DealEntity extends BaseEntity {
    @Expose()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Expose()
    @Index({ fulltext: true })
    @Column()
    title!: string;

    @Expose()
    @Index({ fulltext: true })
    @Column({ comment: 'deal description', type: 'longtext' })
    description!: string;

    @Expose()
    @OneToOne(() => MediaEntity, (image) => image.deal, { nullable: true, cascade: true })
    image: MediaEntity;

    @Expose()
    @Column({ type: 'float', comment: 'deal old price', nullable: true })
    oldPrice?: number;

    @Expose()
    @Column({ type: 'float', comment: 'deal price', default: 0 })
    price: number;

    @Expose()
    @Column({ comment: 'deal link' })
    link: string;

    @Expose()
    @Column({ type: 'boolean', comment: 'show deal at homepage top swipper', default: false })
    isTop: boolean;

    @Expose()
    @Column({
        comment: 'ends time',
        type: 'varchar',
        nullable: true,
    })
    endedAt!: Date;

    @Expose()
    isExpired: boolean;

    @Expose()
    @Column({ comment: 'deals keywords', type: 'simple-array', nullable: true })
    keywords?: string[];

    @Expose()
    @Type(() => Date)
    @CreateDateColumn({
        comment: 'created at time',
    })
    createdAt!: Date;

    @Expose()
    @Type(() => Date)
    @UpdateDateColumn({
        comment: 'updated at time',
    })
    updatedAt!: Date;

    @Expose()
    @Column({ comment: "deal's order", default: 0 })
    customOrder!: number;

    @Expose()
    @ManyToMany(() => CategoryEntity, {
        cascade: true,
    })
    @JoinTable()
    categories!: CategoryEntity[];

    @Expose()
    @ManyToOne((type) => BrandEntity, (brand) => brand.deals, {
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    brand!: BrandEntity;

    @Expose()
    @ManyToOne(() => StoreEntity, (store) => store.deals, {
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    store!: StoreEntity;

    @OneToMany(() => OrderEntity, (order) => order.deal, { cascade: true })
    orders: OrderEntity[];

    @Expose()
    @Type(() => UserEntity)
    @ManyToMany((type) => UserEntity, (user) => user.favorites, {
        cascade: true,
    })
    @JoinTable()
    favoriters!: UserEntity[];

    @Expose()
    @OneToOne(() => PushedEntity, (pushed) => pushed.deal, { nullable: true })
    pushed: PushedEntity | null;

    @AfterLoad()
    async generateIsExpired() {
        this.isExpired = this.endedAt < new Date();
    }
}
