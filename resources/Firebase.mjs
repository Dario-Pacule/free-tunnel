import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

export class Firebase {
  constructor() {
    const _firebaseConfig = {
      apiKey: "AIzaSyAHUIK706AA3r85M8XG_0T1_7TU7T8uE48",
      authDomain: "libertas-switch-master.firebaseapp.com",
      projectId: "libertas-switch-master",
      storageBucket: "libertas-switch-master.appspot.com",
      messagingSenderId: "236467796010",
      appId: "1:236467796010:web:75c5a866c93b2a6880ab53",
      measurementId: "G-DX33V9WGL7",
      databaseURL:
        "https://libertas-switch-master-default-rtdb.firebaseio.com/",
    };

    this._app = initializeApp(_firebaseConfig);
    this._db = getDatabase(this.app);
  }

  async writeData(id, tunnelUrl) {
    set(ref(this._db, id), {
      tunnelUrl,
    });
  }
}
