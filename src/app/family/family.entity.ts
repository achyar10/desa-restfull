import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { Citizen } from "../citizen/citizen.entity";
import { Rt } from "../rt/rt.entity";

@Entity('family_cards')
export class FamilyCard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    number: string;

    @Column()
    head_of_family: string;

    @Column({type: 'text', nullable: true})
    address: string;

    @Column({nullable: true})
    zip: string;

    @Column({ type: 'date', nullable: true })
    print_date: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @ManyToOne(() => Rt, data => data.family_cards, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'rt_id' })
    rt: Rt

    @RelationId((field: FamilyCard) => field.rt)
    rt_id: number;

    @OneToMany(() => Citizen, data => data.family_card, { onDelete: 'CASCADE' })
    citizens: Citizen[];

}