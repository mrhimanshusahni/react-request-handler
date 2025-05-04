import { requestHandler } from "./request-handler";

const getPosts = async () => {
  interface E {
    userId: number;
    that: Number;
    title: string;
    body: string;
  }
  return await requestHandler<E>({
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "post",
    requestData: {
      id: 1,
    },
  });
};

const getAlbums = async () => {
  interface E {
    userId: number;
    id: number;
    title: string;
  }
  return await requestHandler<Array<E>>({
    url: "https://jsonplaceholder.typicode.com/albums",
    method: "get",
  });
};

export { getPosts, getAlbums };
