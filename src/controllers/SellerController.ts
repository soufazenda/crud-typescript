import {Request, Response} from 'express'
import bcrypt from 'bcrypt';
import Seller from '../schemas/Seller';
import slugify from 'slugify'

class SellerController {
    public async index(req: Request, res: Response): Promise<Response> {
        const seller = await Seller.find()

        return res.json(seller)
    }

    public async create(req: Request, res: Response): Promise<Response> {
        // Verifica se os campos obrigatórios foram enviados
        if(!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.password) {
            return res.json({error: true, message: "Campos incompletos"})
        }

        // Verifica se o email já existe na base de dados
        const exists = await Seller.findOne({email: req.body.email});

        if (exists) {
            return res.json({error: true, message: "Email já cadastrado"})
        }

        const hashPassword = await bcrypt.hash(req.body.password, 8);

        delete req.body.password;

        Object.assign(req.body, {password: hashPassword, slug: slugify(`${req.body.companyNam}`).toLowerCase()});

        // Cria o novo vendedor
        const user = await Seller.create(req.body)

        return res.json(user)
    };

    public async read(req: Request, res: Response): Promise<Response> {
        const seller = await Seller.findOne({slug: req.body.seller});
        if (!seller) {
            return res.json({error: true, message: "Vendedor não encontrado"})
        }

        return res.json(seller)
    }

    public async update(req: Request, res: Response): Promise<Response> {
        // Deve receber um objeto com o _id e as novas informações
        if (!req.body._id) {
            return res.json({error: true, message: "Usuário não encontrado"})
        }

        const seller = req.body;
        delete seller._id

        const updatedData = await Seller.findOneAndUpdate(req.body._id, seller)

        return res.json({error: false, message: "Usuário editado com sucesso!"})
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        // Deve receber um _id
        const seller = await Seller.findOneAndDelete(req.body._id)

        console.log(seller);

        return res.json(seller)
    }

}

export default new SellerController()