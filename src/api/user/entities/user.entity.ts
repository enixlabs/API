import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';
import { Profile } from './profile.entity';
import { Address } from './address.entity';
import { Billing } from './billing.entity';
import { Exclude } from 'class-transformer';
import { Post } from '../../social/posts/entities/post.entity';

@Entity('user', { schema: 'meu' })
export class User {
  @BeforeInsert()
  addId() {
    this.id = v4();
  }

  @PrimaryColumn('uuid', { name: 'id' })
  @ApiProperty({ description: 'unique identifier' })
  id: string;

  @Column()
  @ApiProperty()
  username: string;

  @Column()
  @ApiProperty()
  firstname: string;

  @Column()
  @ApiProperty()
  lastname: string;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  @Exclude()
  password: string;

  // OTHER ENTITIES
  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn({ name: 'profile_id' })
  @ApiProperty()
  profile: Profile;

  @OneToOne(() => Address, (address) => address.user)
  @JoinColumn({ name: 'address_id' })
  @ApiProperty()
  address: Address;

  @OneToOne(() => Billing, (billing) => billing.user)
  @JoinColumn({ name: 'billing_id' })
  @ApiProperty()
  billing: Billing;

  // SOCIAL ENTITIES
  @OneToMany(() => Post, (post: Post) => post.author)
  public posts?: Post[];
}
