import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true, nullable: false, length: 15 })
  cnpj!: string

  @Column()
  name!: string

  @Column()
  slug!: string

  @Column()
  description?: string

  @OneToOne((type) => User, (company) => Company)
  owner!: User
}
