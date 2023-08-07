import { BaseEntity, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { DealEntity } from './deal.entity';

@Entity('user_pusheds')
export class PushedEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @OneToOne(() => DealEntity)
    @JoinColumn()
    deal: DealEntity;
}
