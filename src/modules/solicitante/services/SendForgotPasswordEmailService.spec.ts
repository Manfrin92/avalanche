import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import CreateUserService from './CreateUserService';
import SendForgotPasswordEmail from './SendForgotPasswordEmailService';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepositoy';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmail(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await fakeUsersRepository.create({
      name: 'Joe',
      email: 'joe@hotmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'joe@hotmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
