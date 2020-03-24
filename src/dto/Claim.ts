import { ClaimReviewDto } from "./ClaimReview";

export class ClaimDto {
  text: string;
  claimant: string;
  claimDate: string;
  claimReview: ClaimReviewDto[];

  constructor(
    text = "",
    claimant = "",
    claimDate = "",
    claimReview: ClaimReviewDto[] = []
  ) {
    this.text = text;
    this.claimDate = claimDate;
    this.claimant = claimant;
    this.claimReview = claimReview;
  }
}
