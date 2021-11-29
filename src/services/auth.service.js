/* eslint-disable class-methods-use-this */
import * as authApi from 'services/graphServices/auth.graph';

class AuthService {
  setLocalStorageAuth(result) {
    localStorage.setItem('token', result.token);
    localStorage.setItem('name', result.name);
    localStorage.setItem('email', result.email);
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
