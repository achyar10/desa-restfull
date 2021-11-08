import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Citizen } from "../citizen/citizen.entity";

@Entity('settings')
export class Setting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    pic: string;

    @Column({ type: 'text', nullable: true })
    pic_photo: string;

    @Column({ type: 'text', nullable: true })
    address: string;

    @Column({ nullable: true })
    village: string;

    @Column({ nullable: true })
    sub_district: string;

    @Column({ nullable: true })
    city: string;

    @Column({ nullable: true })
    province: string;

    @Column({ nullable: true })
    zip: string;

    @Column({ nullable: true })
    latitude: string;

    @Column({ nullable: true })
    longitude: string;

    @Column({ type: 'text', nullable: true })
    vision: string;

    @Column({ type: 'text', nullable: true })
    mision: string;

    @Column({ type: 'text', nullable: true })
    about: string;

    @Column({ type: 'text', nullable: true })
    logo: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}