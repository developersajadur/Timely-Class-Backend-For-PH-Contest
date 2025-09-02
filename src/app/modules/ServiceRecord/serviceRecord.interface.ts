export interface IServiceRecord {
  serviceId: string;
  bikeId: string;
  serviceDate: Date;
  completionDate: Date | null;
  description: string;
  status: 'in_progress' | 'pending' | 'done';
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
