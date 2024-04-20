import { IUser } from "./types";

const baseUrl = "https://randomuser.me/api";

const checkResponse = <T>(res:Response):Promise<T> => {
  if (res.ok) {
    return res.json();
    
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

const request = async<T>(endpoint:string): Promise<T> => {
  const url = baseUrl + endpoint;
  return await fetch(url).then(checkResponse<T>);
};

interface IUsersResponse {
    success: boolean,
    results: IUser[],
  }

export const getUsers = async (): Promise<IUser[]> => {
  return await request<IUsersResponse>("/?results=500").then((response) => response.results);
};
