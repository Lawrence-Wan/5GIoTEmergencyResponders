const log4js = require("log4js");

log4js.configure({
  appenders: {
    console: { type: "console" },
    logfile: { type: "file", filename: "5giotLogs.log" },
  },
  categories: {
    default: { appenders: ["logfile", "console"], level: "debug" },
  },
});

const logger = log4js.getLogger("5GiotLogs");
module.exports = { logger };
