import { Exclude, Expose, Type } from 'class-transformer';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { MediaEntity } from '@/modules/media/entities';

import { StoreEntity } from './store.entity';

@Exclude()
@Entity('shop_banners')
export class BannerEntity extends BaseEntity {
    @Expose()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Expose()
    @Column({ comment: 'banner备注' })
    name!: string;

    @Expose()
    @OneToOne(() => MediaEntity, (image) => image.banner, { nullable: true, cascade: true })
    image?: MediaEntity;

    @Expose()
    @Column({ comment: '点击跳转地址' })
    link: string;

    @Expose()
    @ManyToOne((type) => StoreEntity, (store) => store.banners, {
        nullable: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    store!: StoreEntity;

    @Expose()
    @Column({ comment: '折扣信息' })
    discountInfo: string;

    @Column({ comment: "banner's order", default: 0 })
    customOrder!: number;

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
}
