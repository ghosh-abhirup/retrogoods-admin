import { getUser } from "@/services/UserServices";
import useUserStore from "@/store/UserStore";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const fetchUser = async () => {
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) {
    throw new Error("No access token");
  }

  const response = await getUser();

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
};

export function useAuth() {
  const router = useRouter();
  const accessToken = Cookies.get("accessToken");
  const { user, setUser, showLoader, hideLoader } = useUserStore();

  useEffect(() => {
    if (!accessToken) {
      setUser(null);
      router.push("/login");
    } else {
      showLoader();
    }
  }, [accessToken]);

  const queryRes = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const data = await fetchUser();
        setUser(data);
        return data;
      } catch (error) {
        throw error;
      } finally {
        hideLoader();
      }
    },
  });

  useEffect(() => {
    showLoader(); // Show loader when starting auth check
  }, [showLoader]);

  useEffect(() => {
    if (queryRes.isError) {
      setUser(null);
      localStorage.removeItem("accessToken");
      router.push("/login");
    }
  }, [queryRes.isError, router]);
}
