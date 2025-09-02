import { ICustomer } from './customer.interface';
import status from 'http-status';
import { PrismaQueryBuilder } from '../../builders/PrismaQueryBuilder';
import AppError from '../../helpers/AppError';
import prisma from '../../shared/prisma';

const createCustomerIntoDb = async (payload: ICustomer) => {
  const isExist = await prisma.customer.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isExist) {
    throw new AppError(status.CONFLICT, 'Customer already exists');
  }

  const result = await prisma.customer.create({
    data: payload,
  });
  return result;
};

const getAllCustomersFromDbWithQuery = async (query: any) => {
  const { search = '', sort = 'asc', page = 1, limit = 10 } = query;

  return await PrismaQueryBuilder({
    model: prisma.customer,
    searchFields: ['name'],
    search,
    sortField: 'createdAt',
    sortOrder: sort,
    page: Number(page),
    limit: Number(limit),
  });
};

const getSingleCustomerFromDb = async (id: string) => {
  const result = await prisma.customer.findUnique({
    where: {
      customerId: id,
    },
  });
  if (!result || result.isDeleted) {
    throw new AppError(status.NOT_FOUND, 'Customer not found');
  }

  return result;
};

const updateCustomerIntoDb = async (
  id: string,
  payload: Partial<ICustomer>,
) => {
  const isExist = await prisma.customer.findUnique({
    where: {
      customerId: id,
    },
  });
  if (!isExist) {
    throw new AppError(status.NOT_FOUND, 'Customer not found');
  } else if (isExist.isDeleted) {
    throw new AppError(status.NOT_FOUND, 'Customer Is Deleted');
  }

  const result = await prisma.customer.update({
    where: {
      customerId: id,
    },
    data: payload,
  });
  return result;
};

const softDeleteCustomerFromDb = async (id: string) => {
  const isExist = await prisma.customer.findUnique({
    where: {
      customerId: id,
    },
  });
  if (!isExist || isExist.isDeleted) {
    throw new AppError(status.NOT_FOUND, 'Customer not found');
  }

  const result = await prisma.customer.update({
    where: {
      customerId: id,
    },
    data: {
      isDeleted: true,
    },
  });
  return result;
};

export const customerService = {
  createCustomerIntoDb,
  getAllCustomersFromDbWithQuery,
  getSingleCustomerFromDb,
  updateCustomerIntoDb,
  softDeleteCustomerFromDb,
};
