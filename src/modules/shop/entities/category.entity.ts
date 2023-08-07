import { Exclude, Expose } from 'class-transformer';
import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Exclude()
@Entity('shop_categories')
export class CategoryEntity extends BaseEntity {
    @Expose()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Expose()
    @Index({ fulltext: true })
    @Column({ comment: 'cateogry name' })
    name!: string;

    @Expose()
    @Column({ comment: 'cateogry icon', nullable: true })
    icon?: string;

    @Expose({ groups: ['category-tree', 'category-list', 'category-detail'] })
    @Column({ comment: "deal's order", default: 0 })
    customOrder!: number;
}
