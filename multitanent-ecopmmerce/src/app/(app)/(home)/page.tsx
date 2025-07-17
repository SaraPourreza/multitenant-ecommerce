'use client';

import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';



export default  function Home() {
 const trpc = useTRPC();
  const {data} =  useQuery(trpc.auth.session.queryOptions());
  return(
<div>
  <p>load</p>
  {JSON.stringify(data?.user)}
  </div>
  )
}
