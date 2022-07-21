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
    key: "main_font_cdn",
    title: "Main font CDN",
    description:
      "The font CDN makes you load even faster, and/or even from non-google source. Leave empty to disable this feature.",
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
    default: "#000000",
    type: "string",
    inputAs: "color",
  },
  {
    key: "main_color_dark",
    title: "Main font color in dark mode",
    description: "Main font color in dark mode",
    default: "#ffffff",
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
    key: "title_font_cdn",
    title: "Title font CDN",
    description:
      "The font CDN makes you load even faster, and/or even from non-google source. Leave empty to disable this feature.",
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
    default: "#000000",
    type: "string",
    inputAs: "color",
  },
  {
    key: "title_color_dark",
    title: "Title font color in dark mode",
    description: "Title font color in dark mode",
    default: "#ffffff",
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
    key: "code_font_cdn",
    title: "Code font CDN",
    description:
      "The font CDN makes you load even faster, and/or even from non-google source. Leave empty to disable this feature.",
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
    const font_url =
      settings.main_font_cdn ||
      `https://fonts.googleapis.com/css?family=${settings.main_font}`;
    logseq.provideStyle({
      key: "main-font",
      style: `
      /* main font */
      @import url('${font_url}');
      #main-content-container {
        font-family: "${settings.main_font}", sans-serif !important;
        font-weight: ${settings.main_font_weight} !important;
        font-size: ${settings.main_font_size} !important;
        color: ${settings.main_color} !important;
      }
      #main-content-container a.tag {
        font-size: 1em !important;
      }
      html[data-theme=dark] #main-content-container {
        color: ${settings.main_color_dark} !important;
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
    const font_url =
      settings.title_font_cdn ||
      `https://fonts.googleapis.com/css?family=${settings.title_font}`;
    logseq.provideStyle({
      key: "title-font",
      style: `
      /* title font */
      @import url('${font_url}');
      #main-content-container .page-title .title, #main-content-container .journal-title .title {
        font-family: "${settings.title_font}", sans-serif !important;
        font-weight: ${settings.title_font_weight} !important;
        font-size: ${settings.title_font_size} !important;
        color: ${settings.title_color} !important;
      }

      html[data-theme=dark] #main-content-container .page-title .title, html[data-theme=dark] #main-content-container .journal-title .title {
        color: ${settings.title_color_dark} !important;
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
    const font_url =
      settings.code_font_cdn ||
      `https://fonts.googleapis.com/css?family=${settings.code_font}`;
    logseq.provideStyle({
      key: "code-font",
      style: `
      /* code font */
      @import url('${font_url}');
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
