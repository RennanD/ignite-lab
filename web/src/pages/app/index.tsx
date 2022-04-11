// import { Container } from './styles';

import { gql, useQuery } from '@apollo/client';

import {
  getAccessToken,
  useUser,
  withPageAuthRequired,
} from '@auth0/nextjs-auth0';

const PRODUCTS_QUERY = gql`
  query GetProducts {
    products {
      id
      title
    }
  }
`;

export default function Home(): JSX.Element {
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
  getServerSideProps: async ({ req, res }) => {
    console.log(getAccessToken(req, res));

    return {
      props: {},
    };
  },
});
