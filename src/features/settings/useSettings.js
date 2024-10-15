import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings.js";

function UseSettings() {
  // eslint-disable-next-line no-unused-vars
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({ queryKey: ["settings"], queryFn: getSettings });
  return { isLoading, error, settings };
}

export default UseSettings;
