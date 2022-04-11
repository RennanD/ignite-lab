import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';
import { NextPage } from 'next';

export const withApollo = (Component: NextPage) => {
  function getApolloClient() {
    const httpLink = createHttpLink({
      uri: 'http://localhost:2000/graphql',
      fetch,
    });

    const cache = new InMemoryCache();

    return new ApolloClient({ link: from([httpLink]), cache });
  }

  return function Provider(props: any) {
    return (
      <ApolloProvider client={getApolloClient()}>
        <Component {...props} />
      </ApolloProvider>
    );
  };
};
