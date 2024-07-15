const useErrorHandler = () => {
  const extractErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
      return error.message;
    }
    return JSON.stringify(error);
  };

  return { extractErrorMessage };
};

export default useErrorHandler;
