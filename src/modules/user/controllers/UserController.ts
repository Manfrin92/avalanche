import { Request, Response } from 'express';
// import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository, getRepository, Repository } from 'typeorm';
import UserService from '../services/UserService';
import authConfig from '../../../config/auth';
import User from '../infra/typeorm/entities/User';

export default class UserController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const userService = new UserService();
      const data = request.body;

      if (
        !data.email ||
        !data.cpf ||
        !data.name ||
        !data.password ||
        !data.phoneNumber ||
        !data.address
      ) {
        return response.status(400).send('Faltam dados para o cadastro');
      }

      const foundEmailCpf = await userService.getByEmailCpf(
        data.email,
        data.cpf,
      );

      if (foundEmailCpf) {
        return response.status(400).send('CPF ou E-mail já utilizado.');
      }

      const user = await userService.create(data);
      delete user?.password;
      return response.json(user);
    } catch (e) {
      console.log('Erro no cadastro, ', e);
      return response.status(400).send('Erro no cadastro.');
    }
  }

  public async checkCpfEmail(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      if (!request.body.email || !request.body.cpf) {
        return response.status(400).send('É necessário informar CPF e Email');
      }

      const userService = new UserService();

      const alreadyCreatedUser = await userService.getByEmailCpf(
        request.body.email,
        request.body.cpf,
      );

      if (alreadyCreatedUser) {
        console.log('Email ou Cpf em uso.');
        return response.json(true);
      }

      return response.json(false);
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  public async logIn(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      if (!email || !password) {
        return response
          .status(400)
          .send('É necessário informar Email e Senha.');
      }

      const userRepository = getRepository(User);
      const user = await userRepository.findOne({
        where: { email },
      });

      if (!user) {
        return response.status(400).send('Usuário não encontrado.');
      }

      const passwordMatched = await compare(
        password.toLowerCase(),
        user.password,
      );

      if (!passwordMatched) {
        return response.status(400).send('Senha não confere.');
      }

      const { secret, expiresIn } = authConfig.jwt;

      const token = sign({}, secret, {
        subject: user.id,
        expiresIn,
      });

      delete user.password;

      return response.json({ user, token });
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}
