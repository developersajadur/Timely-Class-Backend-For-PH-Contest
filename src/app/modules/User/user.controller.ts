import status from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { UserService } from './user.service';

const createUserIntoDb = catchAsync(async (req, res) => {
  const result = await UserService.createUserIntoDb(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
});

export const UserController = {
  createUserIntoDb,
};
