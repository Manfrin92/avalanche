import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepositoy';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('should be able to authenticate an user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashPorvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashPorvider,
    );

    const authenticatedUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashPorvider,
    );

    const user = await createUserService.execute({
      name: 'Joe',
      email: 'joe@hotmail.com',
      password: '123456',
    });

    const response = await authenticatedUser.execute({
      email: 'joe@hotmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should be not able to authenticate an user with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashPorvider = new FakeHashProvider();

    const authenticatedUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashPorvider,
    );

    expect(
      authenticatedUser.execute({
        email: 'joe@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashPorvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashPorvider,
    );

    const authenticatedUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashPorvider,
    );

    expect(
      authenticatedUser.execute({
        email: 'joe@hotmail.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
