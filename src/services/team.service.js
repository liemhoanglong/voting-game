/* eslint-disable class-methods-use-this */
import * as teamApi from 'services/graphServices/team.graph';

class TeamService {
  createTeam(input, file) {
    return teamApi.createTeam(input, file);
  }

  getCloudIdJira(code) {
    return teamApi.getCloudIdJira(code);
  }

  getListProjectFromJira(input) {
    return teamApi.getListProjectFromJira(input);
  }

  getListCardIssueFromJira(input) {
    return teamApi.getListCardIssueFromJira(input);
  }

  importListCardIssue(input) {
    return teamApi.importListCardIssue(input);
  }

  createCardIssue(input) {
    return teamApi.createCardIssue(input);
  }

  updateCardIssue(input) {
    return teamApi.updateCardIssue(input);
  }

  selectCardIssue(input) {
    return teamApi.selectCardIssue(input);
  }

  removeAllCardIssue(teamId) {
    return teamApi.removeAllCardIssue(teamId);
  }

  removeCardIssueById(input) {
    return teamApi.removeCardIssueById(input);
  }

  inviteToTeam(input) {
    return teamApi.inviteToTeam(input);
  }

  getGameState(teamId) {
    return teamApi.getGameState(teamId);
  }

  getAllCardIssueByTeamId(teamId) {
    return teamApi.getAllCardIssueByTeamId(teamId);
  }

  pickCard(teamId, point) {
    return teamApi.pickCard(teamId, point);
  }

  pickCardAndShow(teamId, point) {
    return teamApi.pickCardAndShow(teamId, point);
  }

  changeRole(data) {
    return teamApi.changeRole(data);
  }

  setHost(teamId) {
    return teamApi.setHost(teamId);
  }

  changeHost(input) {
    return teamApi.changeHost(input);
  }

  changeHostWhenJiraCallback(input) {
    return teamApi.changeHostWhenJiraCallback(input);
  }

  removeMember(data) {
    return teamApi.removeMember(data);
  }

  showCards(teamId) {
    return teamApi.showCards(teamId);
  }

  restartGame(teamId) {
    return teamApi.restartGame(teamId);
  }

  startTimer(teamId, time) {
    return teamApi.startTimer(teamId, time);
  }

  joinToGame(teamId) {
    return teamApi.joinToGame(teamId);
  }

  pingUser(teamId, userId) {
    return teamApi.pingUser(teamId, userId);
  }
}

export default new TeamService();
