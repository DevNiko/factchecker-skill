// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

const config = {
  logging: true,

  intentMap: {
    "AMAZON.YesIntent": "YesIntent",
    "AMAZON.NoIntent": "NoIntent",
    "AMAZON.RepeatIntent": "RepeatIntent",
    "AMAZON.StopIntent": "END",
    "AMAZON.StartIntent": "StartIntent",
    "AMAZON.HelpIntent": "HelpIntent",
    "AMAZON.CancelIntent": "CancelIntent"
  },

  db: {},

  i18n: {
    resources: {
      "de-DE": require("./i18n/de-DE")
    },
    debug: true
  },

  fact_tools_api_key: process.env.FACT_TOOLS_API_KEY
};

export = config;
