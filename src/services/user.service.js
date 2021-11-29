/* eslint-disable class-methods-use-this */
import * as userApi from 'services/graphServices/user.graph';

class UserService {
  searchUserByEmail(input) {
    return userApi.searchUserByEmail(input);
  }

  getTeamList() {
    return userApi.getTeamList();
  }

  getUserId() {
    return userApi.getUserId();
  }

  checkToken() {
    return userApi.checkToken();
  }

  getUserSubscriptions(input) {
    return userApi.getUserSubscriptions(input);
  }

  getSubscriptionInvoices(input) {
    return userApi.getSubscriptionInvoices(input);
  }

  getInvoice(input) {
    return userApi.getInvoice(input);
  }

  getUserBillingByStripe(input) {
    return userApi.getUserBillingByStripe(input);
  }

  createSubscription(input) {
    return userApi.createSubscription(input);
  }

  cancelSubscription(input) {
    return userApi.cancelSubscription(input);
  }

  reactivateSubscription(input) {
    return userApi.reactivateSubscription(input);
  }
}

export default new UserService();
