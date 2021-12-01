const asyncHandler = (handler) => {
  return async (...args) => {
    try {
      return await handler(...args);
    } catch (err) {
      return err.response.data;
    }
  };
};

export default asyncHandler;
