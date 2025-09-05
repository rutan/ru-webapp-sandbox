import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { PingComponent } from '$share';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <p>ru-webapp-sandbox</p>
      <Suspense fallback={<div>Loading...</div>}>
        <PingComponent />
      </Suspense>
    </div>
  );
}
