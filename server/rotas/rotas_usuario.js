import Express from "express";
import { nova_senha, pegar_usuario, salvar_foto } from "../controlador/controlador_usuario.js";

const rotas_usuarios = Express.Router()

rotas_usuarios.get('/:email', pegar_usuario)
rotas_usuarios.post('/:email/salvar_foto', salvar_foto)
rotas_usuarios.post('/:email/nova_senha', nova_senha)

export { rotas_usuarios }