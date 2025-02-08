import { useQuery } from "@tanstack/react-query";
import { PairService } from "../services";

interface Receiver {
  name: string | null;
  surname: string | null;
}

const useReceiver = () => {
  return useQuery<Receiver, Error>({
    queryKey: ["receiver"],
    queryFn: async () => {
      const receiver = await PairService.getReceiver();
      return receiver;
    },
  });
};

export default useReceiver;
