const fs = require("fs");
const envVars = `
MAPBOX_TOKEN=${process.env.MAPBOX_TOKEN}\n
`;
fs.writeFileSync("./.env", envVars);