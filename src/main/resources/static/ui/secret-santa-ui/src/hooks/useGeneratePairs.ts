import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SecretSantaService } from '../services';

const useGeneratePairs = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error>({
    mutationFn: () => SecretSantaService.generatePairs(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pairs'] });
    },
  });

  return mutation;
};

export default useGeneratePairs;