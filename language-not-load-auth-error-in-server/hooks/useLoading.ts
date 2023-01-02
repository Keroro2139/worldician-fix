import { useImmer } from "use-immer";

export const useLoading = () => {
  const [state, setState] = useImmer({ loading: false });

  const startLoading = () => {
    setState((state) => {
      state.loading = true;
    });
  };

  const stopLoading = () => {
    setState((state) => {
      state.loading = false;
    });
  };

  return {
    loading: state.loading,
    startLoading,
    stopLoading,
  };
};
