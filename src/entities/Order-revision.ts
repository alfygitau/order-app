import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { RevisionFile } from './Revision-files';

@Entity()
export class OrderRevision {
  @PrimaryGeneratedColumn()
  revision_id: number;

  @Column()
  order_id: number;

  @Column()
  revision_title: string;

  @Column()
  revision_instructions: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.userId, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @OneToMany(() => RevisionFile, (file) => file.fileId)
  order_files: RevisionFile[];
}
