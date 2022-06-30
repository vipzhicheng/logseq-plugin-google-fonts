import "@logseq/libs";
import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

function createModel() {
  return {
    openModal() {
      logseq.showMainUI();
    },
  };
}

async function triggerBlockModal() {
  createModel().openModal();
}

const main = async () => {
  logseq.provideStyle({
    key: "default-font",
    style: `
    @import url('https://fonts.googleapis.com/css?family=Splash');
    @import url('https://fonts.googleapis.com/css?family=Rubik');
    #main-content-container {
      font-family: "Splash", sans-serif;
      font-weight: 400;
      font-size: 20px;
    }

    .CodeMirror pre.CodeMirror-line, .CodeMirror-gutter, .CodeMirror-gutters, .CodeMirror-linenumber, .CodeMirror-scroll, .CodeMirror-sizer {
      font-family: "Rubik", monospace;
      font-weight: 400;
      font-size: 20px;
    }
    `,
  });
};

logseq.ready().then(main).catch(console.error);
