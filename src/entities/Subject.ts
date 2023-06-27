import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'order_subject' })
export class Subject {
  @PrimaryGeneratedColumn()
  order_subject_id: number;

  @Column()
  order_subject_name: string;

  @Column({ nullable: true, length: 500 })
  order_subject_description: string;

  @Column({ default: true })
  IsActive: boolean;
}
