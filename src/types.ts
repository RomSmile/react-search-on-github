export type User = {
  login: string,
  id: number,
  node_id: string,
  avatar_url: string,
  gravatar_id: string,
  url: string,
  html_url: string,
  followers_url: string,
  following_url: string,
  gists_url: string,
  starred_url: string,
  subscriptions_url: string,
  organizations_url: string,
  repos_url: string,
  events_url: string,
  received_events_url: string,
  type: string,
  site_admin: boolean,
  score: number
};

export type ResponseFromUsers = {
  total_count: number,
  incomplete_results: boolean,
  items: User[],
}

export type UserIndividualData = {
  login: string,
  id: number,
  node_id: string,
  avatar_url: string,
  gravatar_id: string,
  url: string,
  html_url: string,
  followers_url: string,
  following_url: string,
  gists_url: string,
  starred_url: string,
  subscriptions_url: string,
  organizations_url: string,
  repos_url: string,
  events_url: string,
  received_events_url: string,
  type: string,
  site_admin: boolean | string,
  name: string,
  company: string | null,
  blog: string,
  location: string,
  email: string | null,
  hireable: string | null,
  bio: string | null,
  twitter_username: string | null,
  public_repos: number,
  public_gists: number,
  followers: number,
  following: number,
  created_at: string,
  updated_at: string
}

export type Repo = {
  name: string,
  stargazers_count: number,
  forks: number,
  id: number,
}