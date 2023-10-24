import { spawn } from "child_process";

const port = process.env.SERVICE_PORT;

class TunnelManager {
  constructor() {
    this.tunnelMoleProcess = spawn("tunnelmole", [port]);
    this.sysLinks = { http: "", https: "" };
  }

  async gen() {
    return new Promise((resolve, reject) => {
      console.log("The tunneling process has started!");

      this.tunnelMoleProcess.stdout.on("data", (data) => {
        if (data.toString().startsWith("http://")) {
          this.sysLinks.http = data.toString().split(" ");
        }
        if (data.toString().startsWith("https://")) {
          this.sysLinks.https = data.toString().split(" ");

          resolve([this.sysLinks.http[0], this.sysLinks.https[0]]);
        }
      });

      this.tunnelMoleProcess.stderr.on("data", (data) => {
        console.log("ERRO: ", data);
        reject(data.toString());
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
