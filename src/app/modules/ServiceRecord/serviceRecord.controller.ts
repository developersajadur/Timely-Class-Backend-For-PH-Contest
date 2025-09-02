import status from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { serviceRecordService } from './serviceRecord.service';

const createServiceRecordIntoDb = catchAsync(async (req, res) => {
  const serviceRecord = await serviceRecordService.createServiceRecordIntoDb(
    req?.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Service Record Created Successfully',
    data: serviceRecord,
  });
});

const getAllServiceRecordsFromDb = catchAsync(async (req, res) => {
  const serviceRecords = await serviceRecordService.getAllServiceRecordsFromDb(
    req?.query,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Service Records Retrieved Successfully',
    data: serviceRecords,
  });
});

const getSingleServiceRecordFromDb = catchAsync(async (req, res) => {
  const serviceRecord = await serviceRecordService.getSingleServiceRecordFromDb(
    req?.params?.id,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Service Record Retrieved Successfully',
    data: serviceRecord,
  });
});

const updateServiceRecordIntoDb = catchAsync(async (req, res) => {
  const serviceRecord = await serviceRecordService.updateServiceRecordIntoDb(
    req?.params?.id,
    req?.body,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Service Record Updated Successfully',
    data: serviceRecord,
  });
});

const getStatusBaseServiceRecordFromDb = catchAsync(async (req, res) => {
  const serviceRecord =
    await serviceRecordService.getStatusBaseServiceRecordFromDb();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Overdue or pending services fetched successfully',
    data: serviceRecord,
  });
});

export const serviceRecordController = {
  createServiceRecordIntoDb,
  getAllServiceRecordsFromDb,
  getSingleServiceRecordFromDb,
  updateServiceRecordIntoDb,
  getStatusBaseServiceRecordFromDb,
};
