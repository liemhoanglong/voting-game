import { gql } from '@apollo/client';
import { User } from './fragments/user.fragment';

export const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input : $input){
        ...User
    }
  }
  ${User}
`;

export const GET_USER_INFO = gql`
  query getUserInfo {
    getUserInfo{
      email
      name
    }
  }
`;

export const SIGNUP = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input)
  }
`;

export const ACTIVATE = gql`
  mutation activate($token: String!) {
    activate(token: $token)
  }
`;

export const CHECK_RESET_PASSWORD_TOKEN = gql`
  mutation checkResetPasswordToken($token: String!) {
    checkResetPasswordToken(token: $token)
  }
`;

export const RESEND_VERIFICATION_EMAIL = gql`
  query resendVerificationEmail($input: ResendVerificationEmailInput!) {
    resendVerificationEmail(input : $input)
  }
`;

export const LOGIN_WITH_GOOGLE = gql`
  mutation loginWithGoogle($googleToken: String!) {
    loginWithGoogle(googleToken: $googleToken) {
      ...User
    }
  }
  ${User}
`;

export const LOGIN_WITH_FACEBOOK = gql`
  mutation loginWithFacebook($input: LoginWithFacebookInput!) {
    loginWithFacebook(input: $input) {
      ...User
    }
  }
  ${User}
`;

export const SEND_RESET_PASSWORD_EMAIL = gql`
  query sendResetPasswordEmail($input: SendResetPasswordEmailInput!) {
    sendResetPasswordEmail(input: $input)
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`;
