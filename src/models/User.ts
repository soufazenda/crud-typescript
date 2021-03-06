import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm'
import Address from './Address'
import Product from './Product'
import Company from './Company'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { appSecret, tokenDuration } from '@configuration/env'

@Entity('users')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'cpf_cnpj', unique: true, nullable: false, length: 15 })
  cpfCnpj!: string

  @Column({ unique: true, nullable: false })
  email!: string

  @Column({ name: 'first_name' })
  firstName!: string

  @Column({ name: 'last_name' })
  lastName!: string

  @Column({ nullable: false })
  birthdate!: Date

  @Column({
    name: 'profile_type',
    enum: ['common', 'corporate'],
    default: 'common',
  })
  profileType!: string

  @Column()
  password!: string

  @Column({ name: 'confirmed_email', default: false })
  confirmedEmail!: boolean

  @Column({ name: 'confirm_email_token', nullable: true })
  confirmEmailToken!: string

  @Column({ length: 15 })
  phone?: string

  @OneToMany((type) => Address, (user) => User)
  addresses?: Promise<Address[]>

  @OneToMany((type) => Product, (user) => User)
  products?: Promise<Product[]>

  @OneToOne((type) => Company, (owner) => User)
  @JoinColumn()
  company!: Company

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  public async authenticate(password: string): Promise<boolean> {
    const match = await bcrypt.compare(password, this.password)
    return match
  }

  public generateToken() {
    return jwt.sign(
      { userId: this.id, profileType: this.profileType },
      appSecret,
      {
        expiresIn: tokenDuration,
      }
    )
  }

  public get fullName() {
    return this.firstName + ' ' + this.lastName
  }
}
