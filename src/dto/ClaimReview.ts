import { PublisherDto } from "./Publisher";

export class ClaimReviewDto {
  publisher: PublisherDto;
  url: string;
  title: string;
  reviewDate: string;
  textualRating: string;
  languageCode: string;

  constructor(
    publisher: PublisherDto = Object(),
    url = "",
    title = "",
    reviewDate = "",
    textualRating = "",
    languageCode = ""
  ) {
    this.publisher = publisher;
    this.url = url;
    this.title = title;
    this.reviewDate = reviewDate;
    this.textualRating = textualRating;
    this.languageCode = languageCode;
  }
}
