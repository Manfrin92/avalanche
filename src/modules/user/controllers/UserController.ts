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

      const foundEmailCpf = await userService.getByEmailCpf(
        data.email,
        data.cpf,
      );

      if (foundEmailCpf) {
        return response.status(400).send('CPF ou E-mail já utilizado.');
      }

      const user = await userService.create(data);
      return response.json(user);
    } catch (e) {
      throw new Error(`Erro ao criar usuário ${e}`);
    }
  }

  public async update(
    request: Request,
    response: Response,
  ): Promise<Response | null> {
    try {
      const userService = new UserService();
      const data = request.body;

      const user = await userService.update(data);
      return response.json(user);
    } catch (e) {
      throw new Error(`Erro ao atualizar usuário ${e}`);
    }
  }

  public async checkCpfEmail(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const userService = new UserService();

      const alreadyCreatedUser = await userService.getByEmailCpf(
        request.body.email,
        request.body.cpf,
      );

      if (alreadyCreatedUser) {
        return response.json(true);
      }

      return response.json(false);
    } catch (e) {
      throw new Error(`Erro ao checar email cpf ${e}`);
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

      const modifiedUser: any = user;
      delete modifiedUser.password;

      return response.json({ user: modifiedUser, token });
    } catch (e) {
      throw new Error(`Erro ao logar ${e}`);
    }
  }
}
