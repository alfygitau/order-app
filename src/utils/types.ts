import { Exclude } from 'class-transformer';
import { UserRole } from 'src/entities/User';

export type ContactDetails = {
  phoneNumber: string;
  address: string;
};

export type CreateUser = {
  role: UserRole;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
};

export type UpdateUser = {
  name: string;
  email: string;
  phoneNumber: string;
};

export class SerializedUser {
  role: UserRole;
  name: string;
  email: string;
  phoneNumber: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}

export type CreateProfile = {
  phoneNumber: string;
  country: string;
  address: string;
  gender: string;
  academicLevel: string;
  bio: string;
  profilePicture: string;
  language: string;
};
