import {
  ApolloClient,
  ApolloLink,
  defaultDataIdFromObject,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';

import { LocalStorageKey } from 'constants/localStorage';
import env from 'constants/environment';

const isProduction = process.env.NODE_ENV !== 'development';

function omitTypename(key, value) {
  return key === '__typename' ? undefined : value;
}

const httpLink = new HttpLink({
  uri: env.GRAPHQL_API,
});

const subscriptionClient = new SubscriptionClient(env.WS_URL, {
  reconnect: true,
  timeout: 60000,
  lazy: true,
});

subscriptionClient.maxConnectTimeGenerator.duration = () => subscriptionClient.maxConnectTimeGenerator.max;

const subscriptionMiddleware = {
  applyMiddleware(options, next) {
    options.auth = { authorization: `Bearer ${localStorage.getItem(LocalStorageKey.TOKEN)}` };
    next();
  },
};
const wsLink = new WebSocketLink(subscriptionClient);
wsLink.subscriptionClient.use([subscriptionMiddleware]);

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${localStorage.getItem(LocalStorageKey.TOKEN)}`,
    },
  });
  if (operation.variables) {
    operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
  }
  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({
      message, locations, path,
      extensions,
    }) => {
      if (extensions.code === 'UNAUTHENTICATED') {
        localStorage.clear();
      }
      if (!isProduction) {
        console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      }
    });
  }
  if (networkError && !isProduction) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  uri: env.GRAPHQL_API,
  link: from([errorLink, authMiddleware, splitLink]),
  cache: new InMemoryCache({
    dataIdFromObject: (object) => {
      switch (object.__typename) {
        case 'Entity':
        case 'Target':
        case 'Actor':
          return object.key;
        default: return defaultDataIdFromObject(object); // fall back to default handling
      }
    },
  }),
});
