/* eslint-disable class-methods-use-this */
import * as authApi from 'services/graphServices/auth.graph';
import { LocalStorageKey } from 'constants/localStorage';

class AuthService {
  setLocalStorageAuth(result) {
    localStorage.setItem(LocalStorageKey.TOKEN, result.token);
    localStorage.setItem(LocalStorageKey.NAME, result.name);
    localStorage.setItem(LocalStorageKey.EMAIL, result.email);
    localStorage.setItem(LocalStorageKey.STRIPE_CUSTOMER_ID, result.stripeCustomerId);
  }

  async login(input) {
    const result = await authApi.login(input);
    if (result) {
      this.setLocalStorageAuth(result);
    }
    return result;
  }

  signup(input) {
    return authApi.signup(input);
  }

  resendVerificationEmail(email) {
    return authApi.resendVerificationEmail(email);
  }

  sendResetPasswordEmail(email) {
    return authApi.sendResetPasswordEmail(email);
  }

  activate(token) {
    return authApi.activate(token);
  }

  checkResetPasswordToken(token) {
    return authApi.checkResetPasswordToken(token);
  }

  async loginWithGoogle(googleToken) {
    const result = await authApi.loginWithGoogle(googleToken);
    if (result) {
      this.setLocalStorageAuth(result);
    }
    return result;
  }

  async loginWithFacebook(input) {
    const result = await authApi.loginWithFacebook(input);
    if (result) {
      this.setLocalStorageAuth(result);
    }
    return result;
  }

  resetPassword(input) {
    return authApi.resetPassword(input);
  }
}

export default new AuthService();
