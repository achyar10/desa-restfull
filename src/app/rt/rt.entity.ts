import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { FamilyCard } from "../family/family.entity";
import { Rw } from "../rw/rw.entity";

@Entity('master_rts')
export class Rt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: string;

    @Column()
    pic: string;

    @Column()
    phone: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @ManyToOne(() => Rw, data => data.rts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'rw_id' })
    rw: Rw

    @RelationId((rt: Rt) => rt.rw)
    rw_id: number;

    @OneToMany(() => FamilyCard, data => data.rt, { onDelete: 'CASCADE' })
    family_cards: FamilyCard[];


}