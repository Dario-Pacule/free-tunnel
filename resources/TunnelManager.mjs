import { spawn } from "child_process";
import path from "path";

const port = process.env.SERVICE_PORT;

class TunnelManager {
  constructor() {
    const telebitPath = path.join(
      __dirname,
      "/home/turbokone/Applications/telebit/bin/telebit"
    );
    this.tunnelMoleProcess = spawn(telebitPath, ["http", port]);
    this.sysLinks = { http: "", https: "" };
  }

  async gen() {
    return new Promise((resolve, reject) => {
      console.log("The tunneling process has started!");

      this.tunnelMoleProcess.stdout.on("data", (data) => {
        console.log(data.toString());
      });

      this.tunnelMoleProcess.stderr.on("data", (data) => {
        console.log("ERRO: ", data);
      });

      this.tunnelMoleProcess.on("close", (code) => {
        console.log(`The tunneling  process is closed with code: ${code}`);
      });
    });
  }

  close() {
    this.tunnelMoleProcess.kill();
  }
}

export { TunnelManager };
