import { ClaimDto } from "./Claim";

export class FactToolsRestApiResultDto {
  claims: ClaimDto[];
  nextPageToken: string;

  constructor(claims: ClaimDto[] = [], nextPageToken = '') {
    this.claims = claims;
    this.nextPageToken = nextPageToken;
  }

}