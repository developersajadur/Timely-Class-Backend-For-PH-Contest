export interface IBike {
  bikeId: string;
  brand: string;
  model: string;
  year: number;
  customerId: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
