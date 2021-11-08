import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { Education } from "../education/education.entity";
import { FamilyCard } from "../family/family.entity";
import { Marital } from "../marital/marital.entity";
import { Relationship } from "../relationship/relationship.entity";
import { Religion } from "../religion/religion.entity";
import { Work } from "../work/work.entity";

@Entity('citizens')
export class Citizen {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 16 })
    nik: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: ['male', 'female'], default: 'male' })
    gender: string;

    @Column()
    place_of_birth: string;

    @Column({ type: 'date' })
    date_of_birth: Date;

    @Column({ type: 'text', nullable: true })
    address: string;

    @Column({ nullable: true })
    blood_type: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @ManyToOne(() => FamilyCard, data => data.citizens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'family_card_id' })
    family: FamilyCard
    @RelationId((field: Citizen) => field.family)
    family_card: number;

    @ManyToOne(() => Relationship, data => data.citizens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'relationship_id' })
    relationship: Relationship
    @RelationId((field: Citizen) => field.relationship)
    relationship_id: number;

    @ManyToOne(() => Education, data => data.citizens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'education_id' })
    education: Education
    @RelationId((field: Citizen) => field.education)
    education_id: number;

    @ManyToOne(() => Religion, data => data.citizens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'religion_id' })
    religion: Religion
    @RelationId((field: Citizen) => field.religion)
    religion_id: number;

    @ManyToOne(() => Marital, data => data.citizens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'marital_status_id' })
    marital_status: Marital
    @RelationId((field: Citizen) => field.marital_status)
    marital_status_id: number;
    
    @ManyToOne(() => Work, data => data.citizens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'work_id' })
    work: Work
    @RelationId((field: Citizen) => field.work)
    work_id: number;
}