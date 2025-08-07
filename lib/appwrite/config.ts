// lib/appwrite/config.ts
import {
  Client,
  Account,
  Databases,
  Storage,
  Avatars,
  Graphql,
} from "appwrite";

export const appwriteConfig = {
  url: process.env.NEXT_PUBLIC_APPWRITE_URL!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  storageId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID!,
  devKeyId: process.env.NEXT_PUBLIC_APPWRITE_DEV_KEY_ID!,
  // Remove userCollectionId since we're not using it
};

export const client = new Client()
  .setEndpoint(appwriteConfig.url)
  .setProject(appwriteConfig.projectId)
  .setDevKey(appwriteConfig.devKeyId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
export const graphql = new Graphql(client);
export { ID } from "appwrite";
