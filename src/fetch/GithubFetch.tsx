import axios from "axios";
import { createHeader } from "../utils/FetchUtils";
import {
  GetGithubTreeResponse,
  GithubInstallation,
  GithubInstallationToken,
} from "../model/GithubModel";

export const getGithubRepoContent = async (
  token: string,
  owner: string,
  repo: string,
  path: string
) => {
  return await axios
    .get(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      createHeader(token)
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return undefined;
    });
};

export const getGithubTree = (token: string, owner: string, repo: string) => {
  return axios
    .get(
      `  https://api.github.com/repos/${owner}/${repo}/git/trees/e516b0ab5b1e6eb2549b089d6650ba9538f5e46a?recursive=true`,
      createHeader(token)
    )
    .then((res) => res.data as GetGithubTreeResponse)
    .catch((err) => {
      console.error(err);
      return undefined;
    });
};

export const getGithubAppInstallations = async (jwt: string) => {
  return await axios
    .get("https://api.github.com/app/installations", createHeader(jwt))
    .then((res) => res.data as GithubInstallation[])
    .catch((err) => {
      console.error(err);
      return [];
    });
};

export const getGithubInstallationAccessTokens = async (
  jwt: string,
  installationId: string
) => {
  return await axios
    .post(
      `https://api.github.com/app/installations/${installationId}/access_tokens`,
      {},
      createHeader(jwt)
    )
    .then((res) => res.data as GithubInstallationToken)
    .catch((err) => {
      console.error(err);
      return undefined;
    });
};
