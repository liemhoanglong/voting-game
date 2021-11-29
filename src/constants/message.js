import {
  MAX_EMAIL_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_NAME_LENGTH,
} from 'constants/validator';

const getMaxLengthMessage = (field, limit) => `${field} must be less than ${limit} characters`;

const getMinLengthMessage = (field, limit) => `${field} must be more than ${limit} characters`;

const getIsRequiredMessage = (field) => `${field} must not be empty`;

const getInvalidMessage = (field) => `${field} is invalid`;

export const ERROR_MIN_PASSWORD_LENGTH = getMinLengthMessage('Password', MIN_PASSWORD_LENGTH);

export const ERROR_MAX_EMAIL_LENGTH = getMaxLengthMessage('Email', MAX_EMAIL_LENGTH);

export const ERROR_MAX_NAME_LENGTH = getMaxLengthMessage('Username', MAX_NAME_LENGTH);

export const ERROR_EMAIL_IS_REQUIRED = getIsRequiredMessage('Email');

export const ERROR_PASSWORD_IS_REQUIRED = getIsRequiredMessage('Password');

export const ERROR_REPEAT_PASSWORD_IS_REQUIRED = getIsRequiredMessage('Repeat Password');

export const ERROR_NAME_IS_REQUIRED = getIsRequiredMessage('Name');

export const ERROR_TIME_IS_REQUIRED = getIsRequiredMessage('Time');

export const ERROR_INVALID_EMAIL = getInvalidMessage('Email');

export const ERROR_PASSWORD_WHITESPACE = 'Password must not contain whitespace';

export const ERROR_PASSWORD_STRENGTH = 'Password must have one uppercase, lowercase and number.';

export const ERROR_PASSWORD_MATCHED = 'Repeat Password must match';

export const ERROR_SERVER_ERROR = 'Something went wrong. Please try again later';

export const ACTIVATE_SUCCESS = 'Verified successfully!';

export const INTERNAL = 'Something went wrong. Please try again later.';

export const EMAIL_ALREADY_EXIST = 'This email already exists.';

export const EMAIL_REGISTERED_BY_THIRD_PARTY = 'Your account was registered via Google or Facebook. Please login with Google or Facebook.';

export const INCORRECT_EMAIL = 'Incorrect email.';

export const INCORRECT_PASSWORD = (time) => `Incorrect password. You have ${time} login attempt(s) left.`;

export const BLOCK_LOGIN = (minute) => `Your account has been temporarily blocked for ${minute} minute(s).`;

export const WRONG_AUTH_TYPE = 'Your account was registered via Google or Facebook. Please login with Google or Facebook.';

export const UNVERIFIED_USER = 'This account is not verified yet. Please check your email and try again.';

export const UNREGISTERED = 'This is email is not registered. Please try again.';

export const BLOCK_RESET_PASSWORD = 'You\'ve reached the daily limit for resetting password. Please try again tomorrow.';

export const BLOCK_RESEND_VERIFICATION = 'You\'ve reached the daily limit for resending verification email. Please try again tomorrow.';

export const EXIST_PASSWORD = 'You\'ve used this password recently. Please use another password.';

export const RESET_PASSWORD_FOR_THIRD_PARTY = 'This email address is currently being used with Google or Facebook.';
