import { gql } from '@apollo/client';

export const CREATE_TEAM = gql`
  mutation createTeam($input: CreateTeamInput!, $file:Upload!) {
    createTeam(input : $input,file: $file)
  }
`;

export const GET_LIST_SITE_JIRA = gql`
  query getListSiteJira($code: String!) {
    getListSiteJira(code : $code){
      jiraToken 
      jiraSiteList {id url name}
    }
  }
`;

export const GET_LIST_PROJECT_FROM_JIRA = gql`
  query getListProjectFromJira ($input: JiraAuth!) {
    getListProjectFromJira(input: $input) {
      id 
      key 
      name
    }
  }
`;

export const GET_LIST_CARD_ISSUE_FROM_JIRA = gql`
  query getListCardIssueFromJira($input: JiraAuthImport!) {
    getListCardIssueFromJira(input : $input){
      total
      listIssue {issue voteScore link description}
    }
  }
`;

export const IMPORT_LIST_CARD_ISSUE = gql`
  mutation importListCardIssue($input: ImportListCardIssueInput!) {
    importListCardIssue(input : $input){
      _id,
      issue,
      voteScore,
      link,
      description,
      createAt
    }
  }
`;

export const CREATE_CARD_ISSUE = gql`
  mutation createCardIssue($input: CreateCardIssueInput!) {
    createCardIssue(input : $input){
      _id,
      issue,
      voteScore,
      link,
      description,
      createAt
    }
  }
`;

export const UPDATE_CARD_ISSUE = gql`
  mutation updateCardIssue($input: CardIssueUpdateInput!) {
    updateCardIssue(input : $input){
      _id,
      issue,
      voteScore,
      link,
      description,
      createAt
    }
  }
`;

export const SELECT_CARD = gql`
  mutation selectCardIssue($input: SelectCardIssueInput!){
    selectCardIssue(input:$input)
  }
`;

export const REMOVE_ALL_CARD_ISSUE = gql`
  mutation removeAllCardIssue($teamId: String!){
    removeAllCardIssue(teamId:$teamId)
  }
`;
export const REMOVE_CARD_BY_ID = gql`
  mutation removeCardIssueById($input: SelectCardIssueInput!){
    removeCardIssueById(input:$input)
  }
`;
export const INVITE_TO_TEAM = gql`
  mutation inviteToTeam($input: InviteToTeamInput!) {
    inviteToTeam(input : $input)
  }
`;

export const SUBSCRIBE_TO_GAME = gql`
  subscription subscribeToGame($teamId: String!) {
    subscribeToGame(teamId: $teamId) {
      code
      userAction {
        _id
        cardState
        role
      }
      cardValues{
        _id
        point
      }
      timer {
        timer
        timerLeft
      },
      cardIssue {
        _id
        issue
        voteScore
        link
        description
        createAt
      }
      cardIssues {
        _id
        issue
        voteScore
        link
        description
        createAt
      }
      currentPoint
      newMember {
        userId
        email
        name
        role
      }
    }
  }
`;

export const GET_GAME_STATE = gql`
query getGameState($teamId: String!) {
    getGameState(teamId: $teamId){
      _id
      name
      urlImage{
        url
        id
      }
      allUserState {
        _id
        email
        name
        role
        isHost
        cardState
      }
      votingSystem
      currentPoint
      role
      isHost
      currentCard
    }
  }
`;

export const GET_CARD_ISSUE_BY_TEAM_ID = gql`
query getAllCardIssueByTeamId($teamId: String!) {
    getAllCardIssueByTeamId(teamId: $teamId){
      _id
      issue
      voteScore
      link
      description
      createAt
    }
  }
`;

export const PICK_CARD = gql`
  mutation pickCard($input: PickCardInput!){
    pickCard(input: $input)
  }
`;

export const PICK_CARD_AND_SHOW = gql`
  mutation pickCardAndShow($input: PickCardInput!){
    pickCardAndShow(input: $input)
  }
`;

export const CHANGE_ROLE = gql`
  mutation changeRole($input: ChangeRoleInput!){
    changeRole(input: $input)
  }
`;

export const CHANGE_HOST = gql`
  mutation changeHost($input: ChangeHost!){
    changeHost(input:$input)
  }
`;

export const CHANGE_HOST_WHEN_JIRA_CALLBACK = gql`
  mutation changeHostWhenJiraCallback($input: ChangeHost!){
    changeHostWhenJiraCallback(input:$input)
  }
`;

export const SET_HOST = gql`
  mutation setHost($teamId: String!){
    setHost(teamId: $teamId)
  }
`;

export const REMOVE_MEMBER = gql`
  mutation removeMember($input: PingUserInput!){
    removeMember(input: $input)
  }
`;

export const PING_USER = gql`
  mutation pingUser($input: PingUserInput!){
    pingUser(input: $input)
  }
`;

export const SHOW_CARDS = gql`
  mutation showCards($teamId: String!){
    showCards(teamId: $teamId)
  }
`;

export const RESTART_GAME = gql`
  mutation restartGame($teamId: String!){
    restartGame(teamId: $teamId)
  }
`;

export const START_TIMER = gql`
  mutation startTimer($input: StartTimerInput!){
    startTimer(input: $input)
  }
`;

export const JOIN_TO_GAME = gql`
  mutation joinToGame($teamId: String!){
    joinToGame(teamId: $teamId)
  }
`;
