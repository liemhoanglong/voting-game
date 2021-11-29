import { client } from 'apolloClient';
import {
  LOGIN,
  SIGNUP,
  ACTIVATE,
  RESEND_VERIFICATION_EMAIL,
  LOGIN_WITH_GOOGLE,
  LOGIN_WITH_FACEBOOK,
  SEND_RESET_PASSWORD_EMAIL,
  RESET_PASSWORD,
  CHECK_RESET_PASSWORD_TOKEN,
} from 'graphQL/authGraph';

export const login = async (input) => {
  const { data } = await client.mutate({
    mutation: LOGIN,
    variables: {
      input,
    },
  });
  return data.login;
};

export const signup = async (input) => {
  const { data } = await client.mutate({
    mutation: SIGNUP,
    variables: { input },
  });

  return data.signUp;
};

export const activate = async (token) => {
  const { data } = await client.mutate({
    mutation: ACTIVATE,
    variables: { token },
  });
  return data.activate; // true
};

export const checkResetPasswordToken = async (token) => {
  const { data } = await client.mutate({
    mutation: CHECK_RESET_PASSWORD_TOKEN,
    variables: token,
  });
  return data.checkResetPasswordToken;
};

export const resendVerificationEmail = async (input) => {
  const { data } = await client.mutate({
    mutation: RESEND_VERIFICATION_EMAIL,
    variables: { input },
  });

  return data.resendVerificationEmail; // true
};

export const loginWithGoogle = async (googleToken) => {
  const { data } = await client.mutate({
    mutation: LOGIN_WITH_GOOGLE,
    variables: { googleToken },
  });
  return data.loginWithGoogle;
};

export const loginWithFacebook = async (input) => {
  const { data } = await client.mutate({
    mutation: LOGIN_WITH_FACEBOOK,
    variables: { input },
  });
  return data.loginWithFacebook;
};

export const sendResetPasswordEmail = async (input) => {
  const { data } = await client.mutate({
    mutation: SEND_RESET_PASSWORD_EMAIL,
    variables: { input },
  });

  return data.sendResetPasswordEmail; // true
};

export const resetPassword = async (input) => {
  const { data } = await client.mutate({
    mutation: RESET_PASSWORD,
    variables: { input },
  });

  return data.resetPassword; // true
};
