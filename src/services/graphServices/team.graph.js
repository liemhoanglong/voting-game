import {
  CREATE_TEAM,
  GET_CLOUD_ID_JIRA,
  GET_LIST_PROJECT_FROM_JIRA,
  GET_LIST_CARD_ISSUE_FROM_JIRA,
  IMPORT_LIST_CARD_ISSUE,
  CREATE_CARD_ISSUE,
  UPDATE_CARD_ISSUE,
  GET_GAME_STATE,
  GET_CARD_ISSUE_BY_TEAM_ID,
  PICK_CARD,
  PICK_CARD_AND_SHOW,
  SHOW_CARDS,
  RESTART_GAME,
  START_TIMER,
  JOIN_TO_GAME,
  PING_USER,
  INVITE_TO_TEAM,
  CHANGE_ROLE,
  CHANGE_HOST,
  REMOVE_MEMBER,
  REMOVE_ALL_CARD_ISSUE,
  REMOVE_CARD_BY_ID,
  SELECT_CARD,
  SET_HOST,
  CHANGE_HOST_WHEN_JIRA_CALLBACK,
} from 'graphQL/teamGraph';
import { FETCH_POLICY } from 'constants/graphql';
import { client } from '../../apolloClient';

export const createTeam = async (input, filee) => {
  const { data } = await client.mutate({
    mutation: CREATE_TEAM,
    variables: {
      input,
      file: filee,
    },
  });
  return data.createTeam;
};

export const getCloudIdJira = async (code) => {
  const { data } = await client.query({
    query: GET_CLOUD_ID_JIRA,
    fetchPolicy: FETCH_POLICY.NO_CACHE,
    variables: {
      code,
    },
  });
  return data.getCloudIdJira;
};

export const getListProjectFromJira = async (input) => {
  const { data } = await client.query({
    query: GET_LIST_PROJECT_FROM_JIRA,
    fetchPolicy: FETCH_POLICY.NO_CACHE,
    variables: {
      input,
    },
  });
  return data.getListProjectFromJira;
};

export const getListCardIssueFromJira = async (input) => {
  const { data } = await client.query({
    query: GET_LIST_CARD_ISSUE_FROM_JIRA,
    fetchPolicy: FETCH_POLICY.NO_CACHE,
    variables: {
      input,
    },
  });
  return data.getListCardIssueFromJira;
};

export const importListCardIssue = async (input) => {
  const { data } = await client.mutate({
    mutation: IMPORT_LIST_CARD_ISSUE,
    variables: {
      input,
    },
  });
  return data.importListCardIssue;
};

export const createCardIssue = async (input) => {
  const { data } = await client.mutate({
    mutation: CREATE_CARD_ISSUE,
    variables: {
      input,
    },
  });
  return data.createCardIssue;
};

export const updateCardIssue = async (input) => {
  const { data } = await client.mutate({
    mutation: UPDATE_CARD_ISSUE,
    variables: {
      input,
    },
  });
  return data.updateCardIssue;
};

export const selectCardIssue = async (input) => {
  const { data } = await client.mutate({
    mutation: SELECT_CARD,
    variables: {
      input,
    },
  });
  return data;
};

export const removeAllCardIssue = async (teamId) => {
  const { data } = await client.mutate({
    mutation: REMOVE_ALL_CARD_ISSUE,
    variables: {
      teamId,
    },
  });
  return data;
};

export const removeCardIssueById = async (input) => {
  const { data } = await client.mutate({
    mutation: REMOVE_CARD_BY_ID,
    variables: {
      input,
    },
  });
  return data;
};

export const inviteToTeam = async (input) => {
  const { data } = await client.mutate({
    mutation: INVITE_TO_TEAM,
    variables: {
      input,
    },
  });
  return data.inviteToTeam;
};

export const getGameState = async (teamId) => {
  const { data } = await client.query({
    query: GET_GAME_STATE,
    fetchPolicy: FETCH_POLICY.NO_CACHE,
    variables: {
      teamId,
    },
  });
  return data.getGameState;
};

export const getAllCardIssueByTeamId = async (teamId) => {
  const { data } = await client.query({
    query: GET_CARD_ISSUE_BY_TEAM_ID,
    fetchPolicy: FETCH_POLICY.NO_CACHE,
    variables: {
      teamId,
    },
  });
  return data.getAllCardIssueByTeamId;
};

export const pickCard = async (teamId, point) => {
  const { data } = await client.mutate({
    mutation: PICK_CARD,
    variables: {
      input: {
        teamId, point,
      },
    },
  });
  return data.pickCard;
};

export const pickCardAndShow = async (teamId, point) => {
  const { data } = await client.mutate({
    mutation: PICK_CARD_AND_SHOW,
    variables: {
      input: {
        teamId, point,
      },
    },
  });
  return data.pickCardAndShow;
};
export const changeHost = async (input) => {
  const { teamId, userId } = input;
  const { data } = await client.mutate({
    mutation: CHANGE_HOST,
    variables: {
      input: {
        teamId,
        userId,
      },
    },
  });
  return data;
};
export const changeHostWhenJiraCallback = async (input) => {
  const { teamId, userId } = input;
  const { data } = await client.mutate({
    mutation: CHANGE_HOST_WHEN_JIRA_CALLBACK,
    variables: {
      input: {
        teamId,
        userId,
      },
    },
  });
  return data;
};
export const changeRole = async (newData) => {
  const { teamId, userId, role } = newData;
  const { data } = await client.mutate({
    mutation: CHANGE_ROLE,
    variables: {
      input: {
        teamId,
        userId,
        role,
      },
    },
  });
  return data.changeRole;
};

export const setHost = async (teamId) => {
  const { data } = await client.mutate({
    mutation: SET_HOST,
    variables: {
      teamId,
    },
  });
  return data;
};

export const removeMember = async (newData) => {
  const { teamId, userId } = newData;
  const { data } = await client.mutate({
    mutation: REMOVE_MEMBER,
    variables: {
      input: {
        teamId,
        userId,
      },
    },
  });
  return data.removeMember;
};

export const pingUser = async (teamId, userId) => {
  const { data } = await client.mutate({
    mutation: PING_USER,
    variables: {
      input: {
        teamId, userId,
      },
    },
  });
  return data.pingUser;
};

export const startTimer = async (teamId, timer) => {
  const { data } = await client.mutate({
    mutation: START_TIMER,
    variables: {
      input: {
        teamId, timer,
      },
    },
  });
  return data.startTimer;
};

export const showCards = async (teamId) => {
  const { data } = await client.mutate({
    mutation: SHOW_CARDS,
    variables: {
      teamId,
    },
  });
  return data.showCards;
};

export const restartGame = async (teamId) => {
  const { data } = await client.mutate({
    mutation: RESTART_GAME,
    variables: {
      teamId,
    },
  });
  return data.restartGame;
};

export const joinToGame = async (teamId) => {
  const { data } = await client.mutate({
    mutation: JOIN_TO_GAME,
    fetchPolicy: FETCH_POLICY.NO_CACHE,
    variables: {
      teamId,
    },
  });
  return data.joinToGame;
};
