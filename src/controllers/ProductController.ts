import {Request, Response} from 'express'
import Product from '../schemas/Product'
import { isValidObjectId } from 'mongoose';
const ObjectId = require('mongoose').Types.ObjectId;

class ProductController {
    public async list(req: Request, res: Response): Promise<Response> {
        const products = await Product.find({seller: req.body.seller});

        return res.json(products);
    }

    public async index(req: Request, res: Response): Promise<Response> {
        const products = await Product.find();

        return res.json(products);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        // Verifica se os campos obrigatórios foram enviados
        if(!req.body.title || !req.body.description || !req.body.location || !req.body.galery) {
            return res.json({error: true, message: "Campos incompletos"})
        }

        await Product.create(req.body)

        return res.json({error: false, message: "produto cadastrado com sucesso"})
    }

    public async read(req: Request, res: Response): Promise<Response> {
        const product = await Product.findOne({_id: req.body.id});
        if (!product) {
            return res.status(404).json({error: true, message: "Produto não encontrado"});
        }

        return res.status(200).json(product)
    }

    public async update(req: Request, res: Response): Promise<Response> {
        if (!req.body._id) {
            return res.json({error: true, message: "Produto não encontrado"})
        }

        const product = req.body;
        delete product._id

        await Product.findOneAndUpdate(req.body._id, product)

        return res.json({error: false, message: "Produto editado com sucesso!"})
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const product = await Product.findOneAndDelete(req.body._id)

        return res.json({error: false, message: "Produto excluído com sucesso!"})
    }
}

export default new ProductController()