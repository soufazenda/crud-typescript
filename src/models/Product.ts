import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm'

import { SOUTH_AMERICA_CURRENCY } from '../utils/commonData'
import User from './User'

@Entity('products')
export default class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ nullable: false })
  title!: string
  @Column()
  description!: string
  @Column()
  price!: number
  @Column({
    enum: ['sell', 'rent'],
    default: 'sell',
  })
  type!: string
  @Column({ enum: SOUTH_AMERICA_CURRENCY, default: 'BRL' })
  currency!: string

  @ManyToOne((type) => User, (products) => Product, {
    eager: true,
    nullable: false,
  })
  seller!: User

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
