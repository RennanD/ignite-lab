// import { Container } from './styles';

import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useGetProductsQuery } from '../../graphql/generated/graphql';
import {
  getServerPageGetProducts,
  ssrGetProducts,
} from '../../graphql/generated/page';
import { withApollo } from '../../services/withApollo';

function Home({ data }): JSX.Element {
  const { user } = useUser();

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <a href="/api/auth/logout">Logout</a>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ctx => {
    return getServerPageGetProducts({}, ctx);
  },
});

export default withApollo(ssrGetProducts.withPage()(Home));
