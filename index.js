import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: "*" }));

app.get("/api", (req, res) => {
  res.json({
    message: "test",
    statusCode: 200,
  });
});

app.listen(443, () => {
  console.log("App is running on 5001");
});
