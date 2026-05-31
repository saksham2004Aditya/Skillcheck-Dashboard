"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type HeroGreetingProps = {
  fallbackName: string;
};

export default function HeroGreeting({ fallbackName }: HeroGreetingProps) {
  const [displayName, setDisplayName] = useState<string>(fallbackName);

  useEffect(() => {
    const supabase = createClient();

    if (!supabase) {
      return;
    }

    void supabase.auth.getUser().then(({ data }) => {
      const userName =
        data.user?.user_metadata?.name ?? data.user?.email?.split("@")[0];

      if (userName) {
        setDisplayName(userName);
      }
    });
  }, [fallbackName]);

  return <span>Welcome back, {displayName}!</span>;
}