import { Octokit, RestEndpointMethodTypes } from '@octokit/rest';
import { GetResponseTypeFromEndpointMethod } from '@octokit/types';

export const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_OCTOKIT_AUTH}`,
};

export const instance = new Octokit({
  auth: import.meta.env.VITE_OCTOKIT_AUTH,
  'X-GitHub-Api-Version': '2022-11-28',
});
