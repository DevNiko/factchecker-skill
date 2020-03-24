export class PublisherDto {
  name: string;
  site: string;

  constructor(name = "", site = "") {
    this.name = name;
    this.site = site;
  }
}
