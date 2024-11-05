import { login as loginApi } from "../../services/apiAuth.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toast";

function UseLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      queryClient.setQueriesData(["user"], user);
      navigate("/dashboard");
    },

    onError: (error) => {
      console.log("Error:", error);
      toast.error("Provided email or password is incorrect.");
    },
  });

  return { login, isLoading };
}

export default UseLogin;
