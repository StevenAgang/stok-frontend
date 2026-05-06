export interface IScrapingResultService {
  results: string;
}

export interface IScrapingJobService {
  url: string;
  priceAnchor: string;
  skipElement: string;
}

export interface IScrapeLinks {
  url: string;
  urlAnchor: string;
}

export interface IExtractedLinks {
  link: string;
  stock: string;
  price: number;
}
