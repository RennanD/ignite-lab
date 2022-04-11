// import { Container } from './styles';

import { gql, useQuery } from '@apollo/client';

import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { withApollo } from '../../services/withApollo';

function Home(): JSX.Element {
  const { user } = useUser();

  const { data } = useQuery(PRODUCTS_QUERY);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <a href="/api/auth/logout">Logout</a>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async () => {
    return {
      props: {},
    };
  },
});

export default withApollo(Home);
