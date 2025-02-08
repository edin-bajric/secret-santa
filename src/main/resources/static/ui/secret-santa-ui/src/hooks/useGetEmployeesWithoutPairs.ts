import { useQuery } from "@tanstack/react-query";
import { SecretSantaService } from "../services";

const useGetEmployeesWithoutPairs = () => {
  return useQuery({
    queryKey: ["employeesWithoutPairs"],
    queryFn: SecretSantaService.getEmployeesWithoutPairs,
    enabled: true,
  });
};

export default useGetEmployeesWithoutPairs;
