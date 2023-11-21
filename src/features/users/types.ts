import { type Request } from "express";

export interface UserStructure {
  _id: string;
  name: string;
  username: string;
  password: string;
}

export interface UserMongooseRepositoryStructure {
  getUser: (username: string, password: string) => Promise<UserWithoutPassword>;
}

export type UserWithoutIdAndName = Omit<UserStructure, "_id" | "name">;

export type UserWithoutPassword = Omit<UserStructure, "password">;

export type UserCredentialStructure = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserWithoutIdAndName
>;

export type UserWithoutIdAndPassword = Omit<UserStructure, "_id" | "password">;
