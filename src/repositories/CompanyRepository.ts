import {EntityRepository, Repository} from "typeorm";
import Company from "@models/Company";

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {
  findBySlug(slug: string) {
    return this.createQueryBuilder('company').where('company.slug = :slug', {slug}).getOne()
  }
}
