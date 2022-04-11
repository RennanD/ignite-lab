import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:2000/graphql',
  fetch,
});

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({ link: from([httpLink]), cache });
