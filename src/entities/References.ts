import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('order_references')
export class Reference {
  @PrimaryGeneratedColumn()
  reference_id: number;

  @Column()
  reference_name: string;

  @Column({ length: 500 })
  reference_description: string;

  @Column()
  number_of_references: number;

  @CreateDateColumn()
  created_at: Date;
}
