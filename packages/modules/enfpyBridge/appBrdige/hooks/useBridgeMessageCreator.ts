import { useDev } from "./useDev";
import { useNavigation } from "./useNavigation";

export const useBridgeMessageCreator = () => {
  const devMessages = useDev();
  const navigationMessages = useNavigation();

  return { dev: { ...devMessages }, navigation: { ...navigationMessages } };
};
