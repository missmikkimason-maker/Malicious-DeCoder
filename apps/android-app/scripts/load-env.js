const fs = require("node:fs");
const path = require("node:path");

const envPath = path.join(process.cwd(), ".env");
const isWrappedInQuotes = (value, quote) =>
  value.length >= 2 && value.startsWith(quote) && value.endsWith(quote);

if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, "utf8");

  for (const rawLine of envFile.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim();
    if (!key) continue;

    let value = line.slice(separatorIndex + 1).trim();

    const isDoubleQuoted = isWrappedInQuotes(value, '"');
    const isSingleQuoted = isWrappedInQuotes(value, "'");

    if (isDoubleQuoted || isSingleQuoted) {
      value = value.slice(1, value.length - 1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}
