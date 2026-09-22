import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export function usePendingToast() {
  const [searchParams, setSearchParams] = useSearchParams();
  const hasFiredStorageToast = useRef(false);
  const hasFiredUrlToast = useRef(false);

  // sessionStorage-based toasts (email/password login, logout)
  useEffect(() => {
    if (hasFiredStorageToast.current) return;

    const successMsg = sessionStorage.getItem("toast:success");
    if (successMsg) {
      hasFiredStorageToast.current = true;
      toast.success(successMsg);
      sessionStorage.removeItem("toast:success");
    }

    const errorMsg = sessionStorage.getItem("toast:error");
    if (errorMsg) {
      hasFiredStorageToast.current = true;
      toast.error(errorMsg);
      sessionStorage.removeItem("toast:error");
    }
  }, []);

  // URL-based toast (OAuth login via redirectUrlComplete)
  useEffect(() => {
    if (hasFiredUrlToast.current) return;
    if (searchParams.get("auth") !== "success") return;

    hasFiredUrlToast.current = true;
    toast.success("Welcome back!");

    const next = new URLSearchParams(searchParams);
    next.delete("auth");
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);
}