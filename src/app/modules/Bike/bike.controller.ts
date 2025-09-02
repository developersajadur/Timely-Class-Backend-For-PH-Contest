import status from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { bikeService } from './bike.service';

const createBikeIntoDb = catchAsync(async (req, res) => {
  const bike = await bikeService.createBikeIntoDb(req?.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Bike Created Successfully',
    data: bike,
  });
});

const getAllBikesFromDbWithQuery = catchAsync(async (req, res) => {
  const bikes = await bikeService.getAllBikesFromDbWithQuery(req?.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Bikes Retrieved Successfully',
    data: bikes,
  });
});

const getSingleBikeFromDb = catchAsync(async (req, res) => {
  const bike = await bikeService.getSingleBikeFromDb(req?.params?.id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Bike Retrieved Successfully',
    data: bike,
  });
});

const updateBikeIntoDb = catchAsync(async (req, res) => {
  const bike = await bikeService.updateBikeIntoDb(req?.params?.id, req?.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Bike Updated Successfully',
    data: bike,
  });
});

const softDeleteBikeFromDb = catchAsync(async (req, res) => {
  await bikeService.softDeleteBikeFromDb(req?.params?.id);
  sendResponse(res, {
    statusCode: status.OK, 
    success: true,
    message: 'Bike Deleted Successfully',
    data: null,
  });
});

export const bikeController = {
  createBikeIntoDb,
  getAllBikesFromDbWithQuery,
  getSingleBikeFromDb,
  updateBikeIntoDb,
  softDeleteBikeFromDb,
};
