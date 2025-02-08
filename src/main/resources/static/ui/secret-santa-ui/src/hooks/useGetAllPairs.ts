import { useQuery } from "@tanstack/react-query";
import { SecretSantaService } from "../services";

const useGetAllPairs = () => {
  return useQuery({
    queryKey: ["pairs"],
    queryFn: SecretSantaService.getAllPairs,
    enabled: true,
  });
};

export default useGetAllPairs;