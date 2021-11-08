import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Rt } from "../rt/rt.entity";

@Entity('master_rws')
export class Rw {
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

    @OneToMany(() => Rt, data => data.rw, { onDelete: 'CASCADE' })
    rts: Rt[];
}