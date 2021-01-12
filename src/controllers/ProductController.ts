import { Request, Response } from 'express'
import Product from '../models/Product'
import to from 'await-to-js'

class ProductController {
  public async list(req: Request, res: Response) {
    const { seller } = req.body

    const [err, products] = await to(Product.find({ seller }))

    if (err) res.statusInternalServerError('Não foi possível buscar Produtos')

    return res.statusOk('Produtos Encontrados com sucesso!', products)
  }

  public async index(req: Request, res: Response) {
    const products = await Product.find()

    return res.statusOk('Produtos encontrados com sucesso!', products)
  }

  public async create(req: Request, res: Response) {
    const { title, description, location, galery } = req.body
    // Verifica se os campos obrigatórios foram enviados
    if (!title || !description || !location || !galery) {
      return res.statusUnprocessableEntity('Campos incompletos')
    }

    const [createError, product] = await to(
      Product.insert({title, description})
    )

    if (createError || !product)
      return res.statusInternalServerError('Erro ao criar produto')

    return res.statusCreated('produto cadastrado com sucesso', product)
  }

  public async read(req: Request, res: Response) {
    const { productId } = req.body
    const [findError, product] = await to(Product.findByIds(productId))
    if (findError)
      return res.statusInternalServerError('Erro ao procurar produto!')
    if (findError || !product) {
      return res.statusNotFound('Produto não encontrado!')
    }

    return res.statusOk('Produto encontrado com sucesso!', product)
  }

  public async update(req: Request, res: Response) {
    const { productId, title, description, location, galery } = req.body
    if (productId) {
      return res.statusUnprocessableEntity('Produto não encontrado', {
        productId: 'Nenhum produto especificado!',
      })
    }

    const product = { title, description, location, galery }

    const [updateError, updatedProduct] = await to(
      Product.update({id: productId}, product)
    )

    if (updateError || !updatedProduct)
      return res.statusInternalServerError(
        'Não foi possível atualizar o produto'
      )

    return res.statusOk('Produto editado com sucesso!', {updatedProduct})
  }

  public async delete(req: Request, res: Response) {
    const { productId } = req.body

    const [findError, product] = await to(Product.findByIds(productId))
    if (findError)
      res.statusInternalServerError('Erro ao procurar produto!')
    if (!product) res.statusNotFound('Produto não encontrado!')

    return res.statusOk('Produto deletado com sucesso!')
  }
}

export default new ProductController()
