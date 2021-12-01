const asyncHandler = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.log(err);
    }

    next({
      statusCode: res.statusCode,
      message: err.message,
      name: err.name,
      ...err,
    });
  }
};

module.exports = asyncHandler;
