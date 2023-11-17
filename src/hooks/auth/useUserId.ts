import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useSignOut from "./useSignOut";

function useUserId() {
  const { signOut } = useSignOut();
  const session = useSession();

  if (session.status === "unauthenticated") {
    signOut();
    redirect("/login");
  }

  return session.data?.user.id!;
}

export default useUserId;
