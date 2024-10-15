import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings.js";
import { toast } from "react-toast";

function UseEditSettings() {
  const queryClient = useQueryClient();

  const { mutate: editSetting, isLoading: isEditing } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });

      toast.success("Settings successfully updated.");
    },
    onError: (err) => toast.error(err.message),
  });

  return { editSetting, isEditing };
}

export default UseEditSettings;
