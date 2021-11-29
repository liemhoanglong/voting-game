import { FETCH_POLICY } from 'constants/graphql';
import {
  SEARCH_USER_BY_EMAIL, GET_TEAM_LIST, CHECK_TOKEN,
} from 'graphQL/userGraph';
import { client } from 'apolloClient';

export const searchUserByEmail = async (input) => {
  const { data } = await client.query({
    query: SEARCH_USER_BY_EMAIL,
    fetchPolicy: FETCH_POLICY.NETWORK_ONLY,
    variables: {
      input,
    },
  });

  return data.searchUserByEmail;
};

export const getTeamList = async () => {
  const { data } = await client.query({
    query: GET_TEAM_LIST,
    fetchPolicy: FETCH_POLICY.NETWORK_ONLY,
  });

  return data.getTeamList;
};

export const checkToken = async () => {
  const { data } = await client.query({
    query: CHECK_TOKEN,
    fetchPolicy: FETCH_POLICY.NETWORK_ONLY,
  });

  return data.checkToken;
};
