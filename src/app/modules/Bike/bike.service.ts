import status from 'http-status';
import AppError from '../../helpers/AppError';
import prisma from '../../shared/prisma';
import { PrismaQueryBuilder } from '../../builders/PrismaQueryBuilder';
import { IBike } from './bike.interface';

const createBikeIntoDb = async (payload: IBike) => {
  const isExistCustomer = await prisma.customer.findUnique({
    where: {
      customerId: payload?.customerId,
    },
  });

  if (!isExistCustomer || isExistCustomer.isDeleted) {
    throw new AppError(status.NOT_FOUND, 'Customer not found');
  }

  const result = await prisma.bike.create({
    data: payload,
  });
  return result;
};

const getAllBikesFromDbWithQuery = async (query: any) => {
  const { search = '', sort = 'asc', page = 1, limit = 10 } = query;
  return await PrismaQueryBuilder({
    model: prisma.bike,
    searchFields: ['brand', 'model'],
    search,
    sortField: 'createdAt',
    sortOrder: sort,
    page: Number(page),
    limit: Number(limit),
  });
};

const getSingleBikeFromDb = async (id: string) => {
  const result = await prisma.bike.findUnique({
    where: {
      bikeId: id,
    },
  });
  if (!result || result.isDeleted) {
    throw new AppError(status.NOT_FOUND, 'Bike not found');
  }

  return result;
};

const updateBikeIntoDb = async (id: string, payload: Partial<IBike>) => {
  const isExist = await prisma.bike.findUnique({
    where: {
      bikeId: id,
    },
  });
  if (!isExist) {
    throw new AppError(status.NOT_FOUND, 'Bike not found');
  } else if (isExist.isDeleted) {
    throw new AppError(status.NOT_FOUND, 'Bike is deleted');
  }

  const result = await prisma.bike.update({
    where: {
      bikeId: id,
    },
    data: payload,
  });
  return result;
};

const softDeleteBikeFromDb = async (id: string) => {
  const isExist = await prisma.bike.findUnique({
    where: {
      bikeId: id,
    },
  });
  if (!isExist || isExist.isDeleted) {
    throw new AppError(status.NOT_FOUND, 'Bike not found');
  }

  const result = await prisma.bike.update({
    where: {
      bikeId: id,
    },
    data: {
      isDeleted: true,
    },
  });
  return result;
};

export const bikeService = {
  createBikeIntoDb,
  getAllBikesFromDbWithQuery,
  getSingleBikeFromDb,
  updateBikeIntoDb,
  softDeleteBikeFromDb,
};
