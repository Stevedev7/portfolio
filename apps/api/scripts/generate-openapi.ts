import { writeFileSync } from "fs";
import { openApiDocument } from "../src/config/openapi";

writeFileSync("./openapi.json", JSON.stringify(openApiDocument, null, 2));
console.log("openapi.json generated");
