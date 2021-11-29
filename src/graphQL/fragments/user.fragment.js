import { gql } from '@apollo/client';

export const User = gql`
fragment User on AuthPayload {
       token
       email
       name
    }
`;
