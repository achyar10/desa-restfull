import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Citizen } from "../citizen/citizen.entity";

@Entity('relationships')
export class Relationship {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @OneToMany(() => Citizen, data => data.relationship, { onDelete: 'CASCADE' })
    citizens: Citizen[];
}