export function notFound(req, res, next) {
  res.status(404).json({ error: `Route not found: ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Internal server error",
  });
}
