import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useMeQuery } from '../../graphql/generated/graphql';
import {
  getServerPageGetProducts,
  ssrGetProducts,
} from '../../graphql/generated/page';
import { withApollo } from '../../services/withApollo';

function Home({ data }): JSX.Element {
  const { user } = useUser();
  const { data: me } = useMeQuery();

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>{JSON.stringify({ me }, null, 2)}</pre>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <a href="/api/auth/logout">Logout</a>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ctx => {
    // getServerPageGetProducts({}, ctx);
    return {
      props: {},
    };
  },
});

export default withApollo(ssrGetProducts.withPage()(Home));
