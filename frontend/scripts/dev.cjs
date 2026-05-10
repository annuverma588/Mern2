const { spawn } = require("child_process");

const isWindows = process.platform === "win32";
const npm = isWindows ? "npm.cmd" : "npm";

const processes = [
  spawn(npm, ["--prefix", "Backend", "run", "dev"], {
    stdio: "inherit",
    shell: false,
  }),
  spawn(npm, ["run", "frontend"], {
    stdio: "inherit",
    shell: false,
  }),
];

const shutdown = (code = 0) => {
  processes.forEach((child) => {
    if (!child.killed) child.kill();
  });
  process.exit(code);
};

processes.forEach((child) => {
  child.on("exit", (code) => {
    if (code && code !== 0) shutdown(code);
  });
});

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
