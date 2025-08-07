// User types
export interface INewUser {
  email: string;
  password: string;
  name: string;
  username: string;
}

export interface IUpdateUser {
  userId: string;
  name: string;
  bio: string;
  imageUrl: string;
  imageId: string;
  file: File[];
}

// Post types
export interface INewPost {
  userId: string;
  caption: string;
  location: string;
  tags?: string;
  file: File[];
}

export interface IUpdatePost {
  postId: string;
  caption: string;
  location: string;
  tags?: string;
  imageUrl: string;
  imageId: string;
  file: File[];
}

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};
