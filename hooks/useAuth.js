import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProfile } from "../services/userService";


export function useAuth(redirectTo = "/signin") {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch {
        router.push(redirectTo);
      }
    }
    checkUser();
  }, []);

  return user;
}
