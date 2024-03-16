const fs = require("fs");
const {
  Location,
  ReturnType,
  CodeLanguage,
} = require("@chainlink/functions-toolkit");

// Configure the request by setting the fields below
const requestConfig = {
  source: fs.readFileSync("./testing.js").toString(),
  codeLocation: Location.Inline,
  secrets: { apiKey: process.env.PINATA_API_KEY || "" },
  secretsLocation: Location.DONHosted,
  args: ["1"],
  // Code language (only JavaScript is currently supported)
  codeLanguage: CodeLanguage.JavaScript,
  // Expected type of the returned value
  expectedReturnType: ReturnType.bytes,
};

module.exports = requestConfig;
