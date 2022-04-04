// import { Container } from './styles';

import { getSession, useUser } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';

export default function Home(): JSX.Element {
  const { user } = useUser();

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
