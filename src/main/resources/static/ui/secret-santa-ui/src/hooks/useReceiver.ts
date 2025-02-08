import { useQuery } from "@tanstack/react-query";
import { PairService } from "../services/pairs";

interface Receiver {
  name: string;
  surname: string;
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
