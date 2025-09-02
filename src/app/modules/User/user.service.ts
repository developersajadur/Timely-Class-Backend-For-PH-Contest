import { User } from '@prisma/client';
import prisma from '../../shared/prisma';
import AppError from '../../helpers/AppError';
import status from 'http-status';
import { hashPassword } from '../../helpers/password';

const createUserIntoDb = async (payload: User) => {
  const isExistUser = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });
  if (isExistUser) {
    throw new AppError(status.CONFLICT, 'User with this email already exists');
  }
  const hashed = await hashPassword(payload.password);

  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashed,
    },
  });

  return result;
};

export const UserService = {
  createUserIntoDb,
};
