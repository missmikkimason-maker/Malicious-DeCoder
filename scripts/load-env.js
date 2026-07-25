const fs = require("node:fs");
const path = require("node:path");

const envPath = path.join(process.cwd(), ".env");
const isWrappedInQuotes = (value, quote) =>
  value.length >= 2 && value.startsWith(quote) && value.endsWith(quote);

const parseValue = (rawValue) => {
  const value = rawValue.trim();
  const isDoubleQuoted = isWrappedInQuotes(value, '"');
  const isSingleQuoted = isWrappedInQuotes(value, "'");

  if (isDoubleQuoted) {
    return value
      .slice(1, value.length - 1)
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\r")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  }

  if (isSingleQuoted) {
    return value
      .slice(1, value.length - 1)
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, "\\");
  }

  const commentIndex = value.search(/\s#/);
  if (commentIndex === -1) {
    return value;
  }

  return value.slice(0, commentIndex).trimEnd();
};

if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, "utf8");

  for (const rawLine of envFile.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim().replace(/^export\s+/, "");
    if (!key) continue;

    if (process.env[key] === undefined) {
      process.env[key] = parseValue(line.slice(separatorIndex + 1));
    }
  }
}
