import {
  BeforeInsert,
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';

@Entity('categories', { schema: 'mes' })
export class Category {
  @BeforeInsert()
  addId() {
    this.id = v4();
  }

  @PrimaryColumn('uuid', { name: 'id' })
  @ApiProperty({ description: 'unique identifier' })
  id: string;

  @Column()
  public name: string;

  @ManyToMany(() => Post, (post: Post) => post.categories)
  public posts: Post[];

  @DeleteDateColumn()
  public deletedAt: Date;
}
