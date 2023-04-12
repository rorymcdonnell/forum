export type PostType = {
  title: string;
  id: string;
  updatedAt?: string;
  createdAt: string;
  user: {
    email: string;
    name: string;
    image: string;
    id: string;
  };
  comments: {
    createdAt: string;
    id: string;
    title: string;
    postId: string;
    userId: string;
    user: {
      email: string;
      name: string;
      image: string;
      id: string;
    };
  }[];
};
