import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Urgency } from './Urgency';
import { Style } from './Style';
import { Subject } from './Subject';
import { AcademicLevel } from './Academic-level';
import { OrderCategory } from './Order-category';
import { OrderType } from './Order-type';
import { OrderFile } from './Order-files';
import { OrderMessage } from './Order-message';
import { Reference } from './References';
import { Pages } from './Pages';
import { OrderRevision } from './Order-revision';
import { RevisionFile } from './Revision-files';
import { User } from './User';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  user: User;

  @ManyToOne(() => OrderType, { nullable: false })
  @JoinColumn()
  order_type: OrderType;

  @ManyToOne(() => OrderCategory, { nullable: false })
  @JoinColumn()
  order_category: OrderCategory;

  @ManyToOne(() => AcademicLevel, { nullable: false })
  @JoinColumn()
  academic_level: AcademicLevel;

  @ManyToOne(() => Urgency, { nullable: false })
  @JoinColumn()
  order_deadline: Urgency;

  @ManyToOne(() => Style, { nullable: false })
  @JoinColumn()
  order_style: Style;

  @ManyToOne(() => Subject, { nullable: false })
  @JoinColumn()
  order_subject: Subject;

  @Column({ length: 500 })
  order_topic: string;

  @Column()
  phone_number: string;

  @ManyToOne(() => Reference, { nullable: false })
  @JoinColumn()
  order_references: Reference;

  @ManyToOne(() => Pages, { nullable: false })
  @JoinColumn()
  order_pages: Pages;

  @Column()
  order_language: string;

  @Column()
  public_id: string;

  @Column()
  order_status: string;

  @Column()
  order_spacing: string;

  @Column({ type: 'text', nullable: true })
  order_instructions: string;

  @Column()
  order_amount: string;

  @Column({ type: 'text' })
  order_additional_information: string;

  @OneToMany(() => OrderMessage, (orderMessage) => orderMessage.order_id)
  order_messages: OrderMessage[];

  @OneToMany(() => OrderFile, (file) => file.order)
  order_files: OrderFile[];

  @OneToMany(() => RevisionFile, (revision) => revision.order)
  revision_files: RevisionFile[];

  @OneToMany(() => OrderRevision, (revision) => revision.order)
  order_revision: OrderRevision[];

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
