import * as MESSAGE from 'constants/message';
import * as CODE from 'constants/errorCode';

export const getErrorMessage = (error) => {
  if (!error.graphQLErrors[0]) { return MESSAGE.INTERNAL; }
  const { code } = error.graphQLErrors[0].extensions;
  const { errorResponse } = error.graphQLErrors[0].extensions;

  switch (code) {
    case CODE.EMAIL_ALREADY_EXIST: return MESSAGE.EMAIL_ALREADY_EXIST;
    case CODE.WRONG_AUTH_TYPE: return MESSAGE.WRONG_AUTH_TYPE;
    case CODE.UNVERIFIED_USER: return MESSAGE.UNVERIFIED_USER;
    case CODE.INCORRECT_EMAIL: return MESSAGE.INCORRECT_EMAIL;
    case CODE.INCORRECT_PASSWORD: return MESSAGE.INCORRECT_PASSWORD(errorResponse.timesLeft);
    case CODE.UNREGISTERED: return MESSAGE.UNREGISTERED;
    case CODE.BLOCK_RESET_PASSWORD: return MESSAGE.BLOCK_RESET_PASSWORD;
    case CODE.BLOCK_RESEND_VERIFICATION: return MESSAGE.BLOCK_RESEND_VERIFICATION;
    case CODE.EXIST_PASSWORD: return MESSAGE.EXIST_PASSWORD;
    case CODE.BLOCK_LOGIN: return MESSAGE.BLOCK_LOGIN(errorResponse.minuteLeft);
    case CODE.RESET_PASSWORD_FOR_THIRD_PARTY: return MESSAGE.RESET_PASSWORD_FOR_THIRD_PARTY;
    default: return MESSAGE.INTERNAL;
  }
};
