const fs = require("node:fs");
const path = require("node:path");

const envPath = path.join(process.cwd(), ".env");

if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, "utf8");

  for (const rawLine of envFile.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    const isDoubleQuoted =
      value.length >= 2 && value.startsWith('"') && value.endsWith('"');
    const isSingleQuoted =
      value.length >= 2 && value.startsWith("'") && value.endsWith("'");

    if (isDoubleQuoted || isSingleQuoted) {
      value = value.slice(1, value.length - 1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}
