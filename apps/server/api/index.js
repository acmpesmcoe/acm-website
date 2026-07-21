import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";

// Connect to MongoDB globally for serverless cold starts
connectDB().catch(err => {
  console.error("Failed to connect to MongoDB during serverless initialization", err);
});

// Export the Express app as the default handler for Vercel
export default app;
