import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
