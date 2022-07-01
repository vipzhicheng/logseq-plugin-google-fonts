import "@logseq/libs";
import { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin";

const defineSettings: SettingSchemaDesc[] = [
  {
    key: "main_font",
    title: "Main font name",
    description:
      "You can choose font from https://fonts.google.com. Change back to empty to disable applied font",
    default: "",
    type: "string",
  },
  {
    key: "main_font_size",
    title: "Main font size",
    description: "Main font color",
    default: "1em",
    type: "string",
  },
  {
    key: "main_font_weight",
    title: "Main font weight",
    description: "Main font weight",
    default: "normal",
    type: "string",
  },
  {
    key: "main_color",
    title: "Main font color",
    description: "Main font color",
    default: "#000",
    type: "string",
    inputAs: "color",
  },

  {
    key: "title_font",
    title: "Title font name",
    description:
      "You can choose font from https://fonts.google.com. Change back to empty to disable applied font",
    default: "",
    type: "string",
  },
  {
    key: "title_font_size",
    title: "Title font size",
    description: "Title font color",
    default: "33px",
    type: "string",
  },
  {
    key: "title_font_weight",
    title: "Title font weight",
    description: "Title font weight",
    default: "bold",
    type: "string",
  },
  {
    key: "title_color",
    title: "Title font color",
    description: "Title font color",
    default: "#000",
    type: "string",
    inputAs: "color",
  },
  {
    key: "code_font",
    title: "Code font name",
    description:
      "You can choose font from https://fonts.google.com. Change back to empty to disable applied font",
    default: "",
    type: "string",
  },
  {
    key: "code_font_size",
    title: "Code font size",
    description: "Code font color",
    default: "14px",
    type: "string",
  },
  {
    key: "code_font_weight",
    title: "Code font weight",
    description: "Code font weight",
    default: "normal",
    type: "string",
  },
];

logseq.useSettingsSchema(defineSettings);

const applyStyles = () => {
  const settings: any = logseq.settings;
  if (settings.main_font) {
    logseq.provideStyle({
      key: "main-font",
      style: `
      /* main font */
      @import url('https://fonts.googleapis.com/css?family=${settings.main_font}');
      #main-content-container {
        font-family: "${settings.main_font}", sans-serif !important;
        font-weight: ${settings.main_font_weight} !important;
        font-size: ${settings.main_font_size} !important;
        color: ${settings.main_color} !important;
      }
      `,
    });
  } else {
    logseq.provideStyle({
      key: "main-font",
      style: `/* main font */`,
    });
  }

  if (settings.title_font) {
    logseq.provideStyle({
      key: "title-font",
      style: `
      /* title font */
      @import url('https://fonts.googleapis.com/css?family=${settings.title_font}');
      #main-content-container .page-title .title {
        font-family: "${settings.title_font}", sans-serif !important;
        font-weight: ${settings.title_font_weight} !important;
        font-size: ${settings.title_font_size} !important;
        color: ${settings.title_color} !important;
      }
      `,
    });
  } else {
    logseq.provideStyle({
      key: "title-font",
      style: `/* title font */`,
    });
  }

  if (settings.code_font) {
    logseq.provideStyle({
      key: "code-font",
      style: `
      /* code font */
      @import url('https://fonts.googleapis.com/css?family=${settings.code_font}');
      .CodeMirror pre.CodeMirror-line, .CodeMirror-gutter, .CodeMirror-gutters, .CodeMirror-linenumber, .CodeMirror-scroll, .CodeMirror-sizer {
        font-family: "${settings.code_font}", sans-serif !important;
        font-weight: ${settings.code_font_weight} !important;
        font-size: ${settings.code_font_size} !important;
        color: ${settings.code_color} !important;
      }
      `,
    });
  } else {
    logseq.provideStyle({
      key: "code-font",
      style: `/* code font */`,
    });
  }
};

const main = async () => {
  applyStyles();
  logseq.on("settings:changed", () => {
    applyStyles();
  });
};

logseq.ready().then(main).catch(console.error);
