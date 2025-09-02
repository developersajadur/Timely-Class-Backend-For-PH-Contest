export interface ICustomer {
  customerId: string;
  name: string;
  email: string;
  phone: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
