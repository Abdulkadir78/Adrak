const notFound = (req, res) => {
  res.status(404);
  throw new Error("Route not found");
};

const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors);
    const errorMsg = errors[errors.length - 1].message;

    return res.status(400).json({ error: errorMsg, success: false });
  }

  if (err.code === 11000) {
    console.log(err);
    const fields = Object.keys(err.keyValue);
    // Capitalize the error field
    // Ex - "email" to "Email"
    const errorField = fields[0][0].toUpperCase() + fields[0].slice(1);

    return res.status(409).json({
      error: `${errorField} already exists`,
      success: false,
    });
  }

  const errStatus = err.statusCode === 200 ? 500 : err.statusCode;
  res.status(errStatus || res.statusCode).json({
    error: err.message || "Something went wrong. Please try again later",
    success: false,
  });
};

module.exports = { notFound, errorHandler };
