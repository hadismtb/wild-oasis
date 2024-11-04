import { login as loginApi } from "../../ui/apiAuth.js";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toast";

function UseLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      navigate("/dashboard");
      console.log(user);
    },

    onError: (error) => {
      console.log("Error:", error);
      toast.error("Provided email or password is incorrect.");
    },
  });

  return { login, isLoading };
}

export default UseLogin;
