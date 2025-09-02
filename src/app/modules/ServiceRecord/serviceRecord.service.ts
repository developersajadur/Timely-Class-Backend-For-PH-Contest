import status from 'http-status';
import AppError from '../../helpers/AppError';
import prisma from '../../shared/prisma';
import { PrismaQueryBuilder } from '../../builders/PrismaQueryBuilder';
import { ServiceRecordStatus } from '../../../../generated/prisma';
import { subDays } from 'date-fns';
import { IServiceRecord } from './serviceRecord.interface';

const createServiceRecordIntoDb = async (payload: IServiceRecord) => {
  const isExistBike = await prisma.bike.findUnique({
    where: {
      bikeId: payload?.bikeId,
    },
  });

  if (!isExistBike || isExistBike.isDeleted) {
    throw new AppError(status.NOT_FOUND, 'Bike not found');
  }

  const result = await prisma.serviceRecord.create({
    data: payload,
  });
  return result;
};

const getAllServiceRecordsFromDb = async (query: any) => {
  const { search = '', sort = 'asc', page = 1, limit = 10 } = query;
  return await PrismaQueryBuilder({
    model: prisma.serviceRecord,
    searchFields: ['description'],
    search,
    sortField: 'createdAt',
    sortOrder: sort,
    page: Number(page),
    limit: Number(limit),
  });
};

const getSingleServiceRecordFromDb = async (id: string) => {
  const serviceRecord = await prisma.serviceRecord.findUnique({
    where: {
      serviceId: id,
    },
  });

  if (!serviceRecord || serviceRecord.isDeleted) {
    throw new AppError(status.NOT_FOUND, 'Service Record not found');
  }

  return serviceRecord;
};

const updateServiceRecordIntoDb = async (
  id: string,
  payload: Partial<IServiceRecord>,
) => {
  const serviceRecord = await prisma.serviceRecord.findUnique({
    where: {
      serviceId: id,
    },
  });

  if (!serviceRecord || serviceRecord.isDeleted) {
    throw new AppError(status.NOT_FOUND, 'Service Record not found');
  }

  const updatedServiceRecord = await prisma.serviceRecord.update({
    where: {
      serviceId: id,
    },
    data: payload,
  });

  return updatedServiceRecord;
};

const getStatusBaseServiceRecordFromDb = async () => {
  const sevenDaysAgo = subDays(new Date(), 7);
  const serviceRecord = await prisma.serviceRecord.findMany({
    where: {
      isDeleted: false,
      serviceDate: {
        lt: sevenDaysAgo,
      },
      status: {
        in: [ServiceRecordStatus.in_progress, ServiceRecordStatus.pending],
      },
    },
  });

  return serviceRecord;
};

export const serviceRecordService = {
  createServiceRecordIntoDb,
  getAllServiceRecordsFromDb,
  getSingleServiceRecordFromDb,
  updateServiceRecordIntoDb,
  getStatusBaseServiceRecordFromDb,
};
