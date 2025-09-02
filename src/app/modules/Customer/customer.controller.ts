import status from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { customerService } from './customer.service';

const createCustomerIntoDb = catchAsync(async (req, res) => {
  const customer = await customerService.createCustomerIntoDb(req?.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Customer Created Successfully',
    data: customer,
  });
});

const getAllCustomersFromDbWithQuery = catchAsync(async (req, res) => {
  const customers = await customerService.getAllCustomersFromDbWithQuery(
    req?.query,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Customers Retrieved Successfully',
    data: customers,
  });
});

const getSingleCustomerFromDb = catchAsync(async (req, res) => {
  const customer = await customerService.getSingleCustomerFromDb(
    req?.params?.id,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Customer Retrieved Successfully',
    data: customer,
  });
});

const updateCustomerIntoDb = catchAsync(async (req, res) => {
  const customer = await customerService.updateCustomerIntoDb(
    req?.params?.id,
    req?.body,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Customer Updated Successfully',
    data: customer,
  });
});

const softDeleteCustomerFromDb = catchAsync(async (req, res) => {
  await customerService.softDeleteCustomerFromDb(req?.params?.id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Customer Deleted Successfully',
    data: null,
  });
});

export const customerController = {
  createCustomerIntoDb,
  getAllCustomersFromDbWithQuery,
  getSingleCustomerFromDb,
  updateCustomerIntoDb,
  softDeleteCustomerFromDb,
};
