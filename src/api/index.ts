import {
  Repo,
  ResponseFromUsers,
  UserIndividualData
} from "../types";

export const getUsers = async (name: string): Promise<ResponseFromUsers> => {
  const response = await fetch(`https://api.github.com/search/users?q=${name}`);

  const data = response.json();

  return data;
}

export const getUserInfo = async (url: string): Promise<UserIndividualData> => {
  const response = await fetch(url)

  const data = response.json();

  return data
}

export const getRepos = async (url:string): Promise<Repo[]> => {
  const response = await fetch(url);

  const data = response.json();

  return data;
}