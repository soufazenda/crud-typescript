import { Router } from "express"
import UserController from "./controllers/UserController"
import SessionController from "./controllers/SessionController"
import ProductController from "./controllers/ProductController"

const routes = Router()

// TODO: User side..................................................................

// Listar todos os produtos do site por paginação

// Buscar produtos

// Visualizar perfil de uma empresa
routes.get("/seller", UserController.read)

// Visualizar um produto - DONE
routes.get("/product", ProductController.read)

// Entrar em contato com o vendedor (Email/Telefone) - Bull e nodemailer

// TODO: Company side (On session)..................................................

// Logon - Email de cadastro  com bull e nodemailer
routes.post("/seller/create", UserController.create)

// Login
routes.post("/login", SessionController.login)

// Profile
routes.put("/seller/update", UserController.update)

// Cadastrar Produto - Enviar o id do vendedor
routes.post("/product/create", ProductController.create)

// Excluir conta
routes.delete("/seller/delete", UserController.delete)

// Editar produto
routes.put("/product/update", ProductController.update)

// Excluir produto
routes.delete("/product/delete", ProductController.delete)

// Listar Produtos
routes.get("/list/products", ProductController.list)

// Admin Routes
routes.get("/users", UserController.index)

export default routes
