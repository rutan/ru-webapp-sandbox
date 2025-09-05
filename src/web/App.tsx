import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { hcWithType } from '../worker/client';

const fetchPing = async () => {
  const client = hcWithType('/');
  const res = await client.api.ping.$get();
  if (!res.ok) {
    console.log('res not ok', res);
    throw new Error(res.statusText);
  }
  const json = await res.json();

  return json;
};

const PingComponent = () => {
  const { data: ping, error } = useSuspenseQuery({
    queryKey: ['ping'],
    queryFn: fetchPing,
  });

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return <div>{JSON.stringify(ping)}</div>;
};

export const App = () => {
  return (
    <div>
      <div>ru-webapp-sandbox</div>
      <Suspense fallback={<div>Loading...</div>}>
        <PingComponent />
      </Suspense>
    </div>
  );
};
