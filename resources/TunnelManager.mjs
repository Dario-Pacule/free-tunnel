import { spawn } from "child_process";

const port = process.env.SERVICE_PORT;

class TunnelManager {
  constructor() {
    const telebitPath = "/home/turbokone/Applications/telebit/bin/telebit";
    this.tunnelMoleProcess = spawn(telebitPath, ["http", port]);
    this.sysLink = "";
  }

  async gen() {
    return new Promise((resolve, reject) => {
      console.log("The tunneling process has started!");

      this.tunnelMoleProcess.stdout.on("data", (data) => {
        console.log("DATA: ", data.toString().split(" "));
      });

      this.tunnelMoleProcess.stderr.on("data", (data) => {
        console.log("ERRO: ", data.toString());
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
