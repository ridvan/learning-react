import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      console.log(data);
      toast.success(
        "User created successfully. Use the link in the given email to verify the new account."
      );
    },
    onError: (error) => {
      toast.error(`Failed to create user: ${error.message}`);
    },
  });

  return { signup, isLoading };
}
