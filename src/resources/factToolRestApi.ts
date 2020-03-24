import { ClaimDto } from "../dto/Claim";
import * as rpn from "request-promise-native";
import { FactToolsRestApiResultDto } from "../dto/FactToolsRestApiResultDto";

export class FactToolRestApi {
  apiUrl = "https://factchecktools.googleapis.com/v1alpha1/claims:"; // The URL uses gRPC Transcoding syntax.

  async searchForClaim(
    claim: string,
    languageCode = "de",
    secret: string
  ): Promise<FactToolsRestApiResultDto> {
    const options = {
      uri: this.apiUrl + "search",
      qs: {
        key: secret,
        query: claim,
        languageCode
      },
      cache: "no-cache",
      redirect: "no-follow",
      referrerPolicy: "no-referrer",
      headers: {
        "Content-Type": "application/json"
      },
      json: true
    };

    const response = await rpn(options);

    return response;
  }
}
