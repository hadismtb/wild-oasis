import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth.js";
import { toast } from "react-toast";

function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,

    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address.",
      );
    },

    // onError: (error) => {
    //   console.log(error);
    //   toast.error(error.message);
    // },
  });

  return { signup, isLoading };
}

export default useSignup;
