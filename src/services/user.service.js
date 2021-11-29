/* eslint-disable class-methods-use-this */
import * as userApi from 'services/graphServices/user.graph';

class UserService {
  searchUserByEmail(input) {
    return userApi.searchUserByEmail(input);
  }

  getTeamList() {
    return userApi.getTeamList();
  }

  checkToken() {
    return userApi.checkToken();
  }
}

export default new UserService();
