import { gql } from '@apollo/client';

export const SEARCH_USER_BY_EMAIL = gql`
  query searchUserByEmail($input: SearchUserByEmailInput!) {
    searchUserByEmail(input: $input) {
      userId
      email
      name
    }
  }
`;

export const GET_TEAM_LIST = gql`
  query {
  getTeamList {
    adminId
    teamId
    name
    teamLink
    urlImage{
      url,
      id
    }
  }
}
`;

export const GET_USER_ID = gql`
  query {
    getUserId
  }
`;

export const CHECK_TOKEN = gql`
  query {
    checkToken
  }
`;

export const GET_USER_SUBSCRIPTIONS = gql`
  query getUserSubscriptions($customer: String!) {
    getUserSubscriptions(customer: $customer) {
      id status  priceId  interval  quantity  created  
      currentPeriodStart  currentPeriodEnd  cancelAtPeriodEnd 
    }
  }
`;

export const CREATE_SUBSCRIPTION = gql`
  mutation createSubscription($input: SubscriptionInput!) {
    createSubscription(input: $input) {
      stripeCustomerId,
      subscriptionId 
      clientSecret 
      message
    }
  }
`;

export const CANCEL_SUBSCRIPTION = gql`
  mutation cancelSubscription($subscriptionId: String!) {
    cancelSubscription(subscriptionId: $subscriptionId) 
  }
`;

export const REACTIVATE_SUBSCRIPTION = gql`
  mutation reactivateSubscription($subscriptionId: String!) {
    reactivateSubscription(subscriptionId: $subscriptionId) 
  }
`;

export const GET_SUBSCRIPTION_INVOICES = gql`
  query getSubscriptionInvoices($subscription: String!) {
    getSubscriptionInvoices(subscription: $subscription) {
      id created total hostedInvoiceUrl 
      customerEmail subscription number 
    }
  }
`;

export const GET_INVOICE = gql`
  query getInvoice($invoiceId: String!) {
    getInvoice(invoiceId: $invoiceId) {
      id created, total hostedInvoiceUrl 
      customerEmail subscription number 
    }
  }
`;

export const GET_USER_BILLING_BY_STRIPE = gql`
  query getUserBillingByStripe($customer: String!) {
    getUserBillingByStripe(customer: $customer)
  }
`;
