import { FETCH_POLICY } from 'constants/graphql';
import {
  SEARCH_USER_BY_EMAIL, GET_TEAM_LIST, GET_USER_ID, CHECK_TOKEN,
  CREATE_SUBSCRIPTION, GET_USER_SUBSCRIPTIONS,
  CANCEL_SUBSCRIPTION, REACTIVATE_SUBSCRIPTION, GET_SUBSCRIPTION_INVOICES,
  GET_INVOICE, GET_USER_BILLING_BY_STRIPE,

} from 'graphQL/userGraph';
import { client } from 'apolloClient';

export const searchUserByEmail = async (input) => {
  const { data } = await client.query({
    query: SEARCH_USER_BY_EMAIL,
    fetchPolicy: FETCH_POLICY.NETWORK_ONLY,
    variables: {
      input,
    },
  });

  return data.searchUserByEmail;
};

export const getTeamList = async () => {
  const { data } = await client.query({
    query: GET_TEAM_LIST,
    fetchPolicy: FETCH_POLICY.NETWORK_ONLY,
  });

  return data.getTeamList;
};

export const getUserId = async () => {
  const { data } = await client.query({
    query: GET_USER_ID,
    fetchPolicy: FETCH_POLICY.NETWORK_ONLY,
  });

  return data.getUserId;
};

export const checkToken = async () => {
  const { data } = await client.query({
    query: CHECK_TOKEN,
    fetchPolicy: FETCH_POLICY.NETWORK_ONLY,
  });

  return data.checkToken;
};

export const getUserSubscriptions = async (input) => {
  const { data } = await client.query({
    query: GET_USER_SUBSCRIPTIONS,
    fetchPolicy: FETCH_POLICY.NETWORK_ONLY,
    variables: input,
  });

  return data.getUserSubscriptions;
};

export const createSubscription = async (input) => {
  const { data } = await client.mutate({
    mutation: CREATE_SUBSCRIPTION,
    variables: {
      input,
    },
  });

  return data.createSubscription;
};

export const cancelSubscription = async (input) => {
  const { data } = await client.mutate({
    mutation: CANCEL_SUBSCRIPTION,
    variables: input,
  });

  return data.cancelSubscription;
};

export const reactivateSubscription = async (input) => {
  const { data } = await client.mutate({
    mutation: REACTIVATE_SUBSCRIPTION,
    variables: input,
  });

  return data.reactivateSubscription;
};

export const getSubscriptionInvoices = async (input) => {
  const { data } = await client.query({
    query: GET_SUBSCRIPTION_INVOICES,
    fetchPolicy: FETCH_POLICY.NETWORK_ONLY,
    variables: input,
  });

  return data.getSubscriptionInvoices;
};

export const getInvoice = async (input) => {
  const { data } = await client.query({
    query: GET_INVOICE,
    fetchPolicy: FETCH_POLICY.NETWORK_ONLY,
    variables: input,
  });

  return data.getInvoice;
};

export const getUserBillingByStripe = async (input) => {
  const { data } = await client.query({
    query: GET_USER_BILLING_BY_STRIPE,
    fetchPolicy: FETCH_POLICY.NETWORK_ONLY,
    variables: input,
  });

  return data.getUserBillingByStripe;
};
