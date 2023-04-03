import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../../../user/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';

@Entity('posts', { schema: 'mes' })
export class Post {
  @BeforeInsert()
  addId() {
    this.id = v4();
  }

  @PrimaryColumn('uuid', { name: 'id' })
  @ApiProperty({ description: 'unique identifier' })
  id: string;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column({ nullable: true })
  public category?: string;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;

  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable()
  public categories: Category[];
}
