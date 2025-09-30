"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("./app");
// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
const indexRouter = require("./routes/index.routes");
app.use("/api", indexRouter);
