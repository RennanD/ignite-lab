// import { Container } from './styles';

import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function Home(): JSX.Element {
  const { user } = useUser();

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <a href="/api/auth/logout">Logout</a>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
