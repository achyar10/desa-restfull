import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true, nullable: true })
    username: string | null;

    @Column()
    password: string;

    @Column()
    fullname: string;

    @Column({ type: 'enum', enum: ['superadmin', 'admin', 'officer'], default: 'officer' })
    role: string;

    @Column({ type: 'text', nullable: true })
    photo: string | null;

    @Column({ default: false })
    is_active: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}