import { App } from "jovo-framework";
import { Alexa } from "jovo-platform-alexa";
import { JovoDebugger } from "jovo-plugin-debugger";
import { FactToolRestApi } from "./resources/factToolRestApi";
import { ClaimDto } from "./dto/Claim";

const app = new App();
const factApi = new FactToolRestApi();

app.use(new Alexa(), new JovoDebugger());

app.setHandler({
  LAUNCH() {
    this.toIntent("StartIntent");
  },

  END() {
    this.toIntent("EndIntent");
  },

  StartIntent() {
    this.$speech.addT("welcome.speech");
    this.$reprompt.addT("welcome.welcome_repromt_1");
    this.ask(this.$speech, this.$reprompt);
  },

  EndIntent() {
    this.tell(this.$speech.addT("end.bye"));
  },

  RepeatIntent() {},

  async ClaimIntent() {
    const claimInput = this.$inputs.claim.value;

    if (claimInput.length === 0) {
      this.tell("");
    }

    const result = await factApi.searchForClaim(
      claimInput,
      "de",
      this.$app.config.fact_tools_api_key
    );

    const { claims = [] } = result;

    if (claims.length === 0) {
      this.tell(this.t("claimintent.no_fact_found"));
    }
    if (claims.length === 1) {
      const claim: ClaimDto = claims[0];
      const claimText = String(
        this.t("claimintent.tell_fact", { fact: claim.text })
      );
      this.$speech.addSentence(claimText);
      this.tell(this.$speech);
    }
    if (claims.length > 1) {
      this.addSessionAttribute("claims", claims);

      this.$speech.addT("claimintent.found_facts", {
        count_found_facts: claims.length
      });
      this.$speech.addT("claimintent.listen_all_facts");

      this.followUpState("FactsState").ask(this.$speech, this.$speech);
    }
  },

  FactsState: {
    YesIntent() {
      this.removeState();
      const claims = this.getSessionAttribute("claims");
      let counter = 1;
      claims.forEach((claim: ClaimDto) => {
        this.$speech
          .addT("claimintent.fact_count_" + counter)
          .addSentence(claim.text);
        this.tell(this.$speech);
        counter++;
      });
    },

    NoIntent() {
      this.removeState();
      this.$speech.addT("claimintent.no_action");
      this.tell(this.$speech);
    },

    Unhandled() {
      this.removeState();
      this.$speech.addT("claimintent.no_action");
      this.tell(this.$speech);
    },

    END() {
      this.removeState();
      this.$speech.addT("claimintent.no_action");
      this.tell(this.$speech);
    }
  },

  YesIntent() {
    // Do something
  },

  NoIntent() {
    // Do something
  },

  Unhandled() {
    // Do something
  }
});

module.exports.app = app;
