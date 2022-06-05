import React, { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';
import { ListOfRepos } from "../ListOfRepos";
import { getUserInfo } from '../../api/index';
import { getRepos } from '../../api/index';
import { Repo } from '../../types';
import './userProfile.scss';

type Props = {
  selectedUser: String
  setProfile: (resetProfile: boolean) => void,
}

type UserInfo = {
  userName: string,
  email: string | null,
  location: string | null,
  joinDate: string,
  followers: number,
  following: number,
  avatarUrl: string,
  siteAdmin: string | boolean,
  name: string,
  company: string | null,
  blog: string | null,
  twitterUsername: string | null,
  publicRepos: number,
  publicGists: number,
  reposUrl: string,
}

export const UserProfile:React.FC<Props> = ({ selectedUser, setProfile }) => {
  const [ userInfo, setUserInfo ] = useState<UserInfo>({
    userName: "",
    email: "",
    location: "",
    joinDate: "",
    followers: 0,
    following: 0,
    avatarUrl: "",
    siteAdmin: "",
    name: "",
    company: "",
    blog: "",
    twitterUsername: "",
    publicRepos: 0,
    publicGists: 0,
    reposUrl: "",
  });

  const [ user ] = useDebounce(userInfo, 500);

  const [ searchRepo, setSearchRepo ] = useState<string>('');
  const [ searchValue ] = useDebounce(searchRepo, 500);

  const [ arrRepo, setArrRepo ] = useState<Repo[]>([])

  useEffect(() => {
    (
      async () => {
        const response = await getUserInfo(`https://api.github.com/users/${selectedUser}`);

        setUserInfo({
          userName: response.login,
          email: response.email,
          location: response.location,
          followers: response.followers,
          following: response.following,
          joinDate: response.created_at,
          avatarUrl: response.avatar_url,
          siteAdmin: response.site_admin,
          name: response.name,
          company: response.company,
          blog: response.blog,
          twitterUsername: response.twitter_username,
          publicRepos: response.public_repos,
          publicGists: response.public_gists,
          reposUrl: response.repos_url,
        })

        if (searchValue.length !== 0) {
          const repos = await getRepos(response.repos_url);

          setArrRepo(repos.filter(item => item.name.toLowerCase().includes(searchValue.toLocaleLowerCase())));
        } else {
          const repos = await getRepos(response.repos_url);

          setArrRepo(repos);
        }
      }
    )();
  }, [searchValue, selectedUser])

  return (
    <div className="user-profile">
      <div className="user-profile__top top">

        <div className="top__user-container user-container">
          <div className="user-container__image">
            <img src={user.avatarUrl} alt={user.userName} />
          </div>
          <div className="user-container__information">
            <ul>
              <li>User name: {user.userName}</li>
              <li>{user.name && `Name: ${user.name}`}</li>
              <li>{user.email && `Email: ${user.email}`}</li>
              <li>{user.location && `Location: ${user.location}`}</li>
              <li>Followers: {user.followers}</li>
              <li>Following: {user.following}</li>
              <li>{user.siteAdmin && `Site: ${user.siteAdmin}`}</li>
              <li>{user.company && `Company: "${user.company}"`}</li>
              <li>{user.twitterUsername && `Twitter nickname: ${user.twitterUsername}`}</li>
              <li>Public repositories: {user.publicRepos}</li>
              <li>Public gists: {user.publicGists}</li>
            </ul>
          </div>
          <button
            className="user-container__back"
            onClick={() => setProfile(false)}
          >
            x
          </button>
        </div>

        {user.blog &&
          <div className="top__user-blog">
            {user.blog}fsah dfasu dhfopiua hsdfuopih asdfuph[oasifhd asdfasfhdpoahsdf] asdjfas;ldkfj;laskdjf;l ka;slkdjf;la ks
          </div>
        }

        <input
          type="text"
          className="top__search-repo"
          placeholder="Search for User's Repositories"
          value={searchRepo}
          onChange={(event) => {
            setSearchRepo(event.target.value);
          }}
        />
      </div>

      <ListOfRepos arrRepo={arrRepo} />
    </div>
  );
}