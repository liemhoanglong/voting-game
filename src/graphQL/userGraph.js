import { gql } from '@apollo/client';

export const SEARCH_USER_BY_EMAIL = gql`
  query searchUserByEmail($input: SearchUserByEmailInput!) {
    searchUserByEmail(input: $input) {
      userId
      email
      name
    }
  }
`;

export const GET_TEAM_LIST = gql`
  query {
  getTeamList {
    adminId
    teamId
    name
    teamLink
    urlImage{
      url,
      id
    }
  }
}
`;

export const CHECK_TOKEN = gql`
  query {
    checkToken
  }
`;
