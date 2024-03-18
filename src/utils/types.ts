import { Exclude } from 'class-transformer';
import { Readable } from 'stream';

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
  WRITER = 'writer',
}

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

export type OrderTypeParams = {
  order_type_name: string;
  order_type_code: string;
  order_type_description: string;
  order_type_pricing: number;
};

export type CreateOrderCategoryParams = {
  order_category_name: string;
  order_category_description: string;
};

export type CreatePageParams = {
  number_of_pages: number;
  word_count: number;
  pages_description: string;
};

export type CreateStylesParams = {
  style_name: string;
  style_description: string;
  style_code: string;
  createdBy: string;
  updatedBy: string;
};

export type CreateAcademicLevelParams = {
  academic_level_name: string;
  academic_level_description: string;
  academic_level_code: string;
  academic_level_value: number;
};

export type CreateDeadlineParams = {
  order_urgency_name: string;
  order_urgency_duration: number;
  order_urgency_description: string;
};

export type CreateSubjectParams = {
  order_subject_name: string;
  order_subject_description: string;
};

export type CreateReferences = {
  reference_name: string;
  reference_description: string;
  number_of_references: number;
};

export interface MulterFile extends Express.Multer.File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
  destination: string;
  filename: string;
  path: string;
  stream: Readable;
  [key: string]: any; // Add this line if you want to allow additional properties
}

export type CreateMessageParams = {
  message_content: string;
};

export type CreateOrderRevisionParams = {
  revision_title: string;
  revision_instructions: string;
};
