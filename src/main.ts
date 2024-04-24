import "@logseq/libs";
import { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin";

const defineSettings: SettingSchemaDesc[] = [
  {
    key: "main_font",
    title: "Main font name",
    description:
      "You can choose font from https://fonts.google.com. Change back to empty to disable applied font. The format is: A|B|C, the fonts will be used orderly.",
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
    key: "main_font_css",
    title: "Main font CSS",
    description:
      "The font CSS makes you load font by css. Leave empty to disable this feature. Must be valid CSS syntax!",
    default: "",
    type: "string",
    inputAs: "textarea",
  },
  {
    key: "main_font_size",
    title: "Main font size",
    description: "Main font size",
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
      "You can choose font from https://fonts.google.com. Change back to empty to disable applied font.  The format is: A|B|C, the fonts will be used orderly.",
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
    key: "title_font_css",
    title: "Title font CSS",
    description:
      "The font CSS makes you load font by css. Leave empty to disable this feature. Must be valid CSS syntax!",
    default: "",
    type: "string",
    inputAs: "textarea",
  },
  {
    key: "title_font_size",
    title: "Title font size",
    description: "Title font size",
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
      "You can choose font from https://fonts.google.com. Change back to empty to disable applied font.  The format is: A|B|C, the fonts will be used orderly.",
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
    key: "code_font_css",
    title: "Code font CSS",
    description:
      "The font CSS makes you load font by css. Leave empty to disable this feature. Must be valid CSS syntax!",
    default: "",
    type: "string",
    inputAs: "textarea",
  },
  {
    key: "code_font_size",
    title: "Code font size",
    description: "Code font size",
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

    const fonts = (settings.main_font as string)
      .split("|")
      .map((font) => `"${font}"`)
      .join(", ");

    logseq.provideStyle({
      key: "main-font",
      style: `
      /* main font */
      @import url('${font_url}');
      ${
        settings.main_font.split("|").length > 1 && settings.main_font_cdn
          ? "@import url('https://fonts.googleapis.com/css?family=" +
            settings.main_font +
            "');"
          : ""
      }
      ${settings.main_font_css ? settings.main_font_css + "" : ""}
      #main-content-container
      {
        font-family: ${fonts}, sans-serif !important;
        font-weight: ${settings.main_font_weight} !important;
        font-size: ${settings.main_font_size} !important;
        color: ${settings.main_color} !important;
      }
      #main-content-container .ls-block :is(h1,h2,h3,h4,h5,h6) {
        font-weight: ${settings.main_font_weight} !important;
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

    const fonts = (settings.title_font as string)
      .split("|")
      .map((font) => `"${font}"`)
      .join(", ");
    logseq.provideStyle({
      key: "title-font",
      style: `
      /* title font */
      @import url('${font_url}');
      ${
        settings.title_font.split("|").length > 1 && settings.title_font_cdn
          ? "@import url('https://fonts.googleapis.com/css?family=" +
            settings.title_font +
            "');"
          : ""
      }
      ${settings.title_font_css ? settings.title_font_css + "" : ""}
      #main-content-container .page-title .title, #main-content-container .journal-title .title {
        font-family: ${fonts}, sans-serif !important;
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

    const fonts = (settings.code_font as string)
      .split("|")
      .map((font) => `"${font}"`)
      .join(", ");
    logseq.provideStyle({
      key: "code-font",
      style: `
      /* code font */
      @import url('${font_url}');
      ${
        settings.code_font.split("|").length > 1 && settings.code_font_cdn
          ? "@import url('https://fonts.googleapis.com/css?family=" +
            settings.code_font +
            "');"
          : ""
      }
      ${settings.code_font_css ? settings.code_font_css + "" : ""}
      .CodeMirror pre.CodeMirror-line, .CodeMirror-gutter, .CodeMirror-gutters, .CodeMirror-linenumber, .CodeMirror-scroll, .CodeMirror-sizer {
        font-family: ${fonts}, sans-serif !important;
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
