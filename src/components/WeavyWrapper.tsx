import { WeavyClient, WeavyProvider } from '@weavy/uikit-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useSession } from "next-auth/react";

type Props = {
    children: React.ReactNode
}

export default function WeavyWrapper({ children }: Props) {
    const [client, setClient] = useState<WeavyClient | null>(null);
    const { data: session, status } = useSession();
  
    const getToken = useCallback(async (refresh: boolean) => {
  
      var response = await fetch(`/api/token?refresh=${refresh}`);
      var json = await response.json();
      return json.access_token
  
    }, []);
  
    useEffect(() => {
      if (status === "authenticated") {
        let client = new WeavyClient({ url: process.env.WEAVY_URL ?? "", tokenFactory: getToken });
        setClient(client);
      }
  
    }, [getToken, status])
  
    return (
      <>
        {status === "authenticated" &&
          <WeavyProvider client={client} options={{ }}>        
            {children}
          </WeavyProvider>
        }
      </>
  
  
    )
  }
  