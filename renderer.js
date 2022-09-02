const ipc = require("electron").ipcRenderer;
const openBtn = document.getElementById("openBtn");

var term = new Terminal({ convertEol: true });
openBtn.addEventListener("click", function (event) {
  openCashDrawer();
  console.log(openCashDrawer());
});

term.open(document.getElementById("terminal"));
ipc.on("terminal.incomingData", (event, data) => {
  term.write(data);
});

term.onData((e) => {
  ipc.send("terminal.keystroke", e);
  //   ipc.send("chsh -s /bin/zsh");
  //   term.write("php -v");
});

const { exec } = require("child_process");

function openCashDrawer() {
  term.prompt = function () {
    term.write("\r\n" + shellprompt);
  };

  exec(
    "git clone https://github.com/hashicorp/vagrant.git",
    (error, stdout, stderr) => {
      if (error) {
        console.log(`[ERROR] openCashDrawer: ${error.message}`);
        return;
      }

      if (stderr) {
        console.log(`[STDERROR] openCashDrawer: ${stderr}`);
        return;
      }

      console.log(`openCashDrawer: ${stdout}`); // Output response from the terminal
    }
  );
}
