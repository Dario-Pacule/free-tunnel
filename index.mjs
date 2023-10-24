import "dotenv/config";
import { Firebase } from "./resources/Firebase.mjs";
import { TunnelManager } from "./resources/TunnelManager.mjs";
import { checkLinkStatus } from "./resources/checkLinkStatus.mjs";

const tunnelManager = new TunnelManager();
const firebaseApp = new Firebase();
var tunnelURL = "";
var genTryCounter = 0;
var linkCheckTryCounter = 0;

tunnelManager
  .gen()
  .then((data) => {
    tunnelURL = data[0];
    console.log(data);

    firebaseApp.writeData("liberRaspBery", tunnelURL);
  })
  .catch((_) => {
    if (genTryCounter < 5) {
      genTryCounter++;
    } else {
      console.error("Problem to connect the server!");
      tunnelManager.close();
      process.exit(1);
    }
  });

setInterval(async () => {
  if (tunnelURL)
    checkLinkStatus(tunnelURL)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        if (linkCheckTryCounter < 1) {
          linkCheckTryCounter++;
        } else {
          console.error(JSON.stringify(err));
          tunnelManager.close();
          process.exit(1);
        }
      });
}, 5000);
