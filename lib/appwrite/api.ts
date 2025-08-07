// lib/appwrite/api.ts
import { ID } from "appwrite";
import { account, avatars } from "./config";

export async function createUserAccount(user: {
  email: string;
  password: string;
  name: string;
  username?: string;
}) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    console.log("User created:", newAccount);

    if (!newAccount) throw new Error("Account creation failed");

    // Return basic user data from account creation
    return {
      id: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username || newAccount.name,
      imageUrl: avatars.getInitials(newAccount.name),
    };
  } catch (error) {
    console.error("createUserAccount error:", error);
    throw error;
  }
}

export async function signInAccount({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    console.log("Session created:", session);
    return session;
  } catch (error) {
    console.error("signInAccount error:", error);
    throw new Error("Invalid credentials or server error");
  }
}

export async function getCurrentAccount() {
  try {
    return await account.get();
  } catch (error) {
    console.error("getCurrentAccount error:", error);
    return null;
  }
}
