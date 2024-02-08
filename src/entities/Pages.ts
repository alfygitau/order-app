import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: 'order_pages'})
export class Pages {
  @PrimaryGeneratedColumn()
  pages_id: number;

  @Column()
  number_of_pages: number;

  @Column()
  word_count: number;

  @Column()
  pages_description: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
