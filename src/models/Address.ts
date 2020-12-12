import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './User'

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name?: string

  @Column({ nullable: false, length: 10 })
  cep!: string

  @Column({ unique: true, nullable: false })
  city!: string

  @Column({ nullable: false })
  state!: string

  @Column({ nullable: false })
  street!: string

  @Column({ nullable: false })
  number!: string

  @Column({ nullable: false })
  country!: string

  @Column({ nullable: false })
  neighborhood!: string

  @Column()
  additional?: string

  @ManyToOne((type) => User, (addresses) => Address, {
    eager: true,
    nullable: false,
  })
  user!: User

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
