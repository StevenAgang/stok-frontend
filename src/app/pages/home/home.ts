import { Component, OnInit, signal } from '@angular/core';
import { ScrapingService } from '../../service/Hub/scraping-service';
import {
  IExtractedLinks,
  IScrapeLinks,
  IScrapingJobService,
  IScrapingResultService,
} from '../../interface/Hub/IScrapingService';
import { Navbar } from '../../components/navbar/navbar';
import { TaskBar } from '../../components/taskbar/taskbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Navbar, TaskBar, RouterOutlet],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  eligibleForPosting = signal<boolean>(true);
  result = signal<IScrapingResultService[]>([]);
  resultLink = signal<IExtractedLinks[]>([]);
  urls: IScrapingJobService[] = [
    {
      url: 'https://www.hurstautoplex.com/used-inventory/index.htm?accountId=hurstmitsubishipreowned&sortBy=internetPrice%20asc',
      priceAnchor: 'Price',
      skipElement: 'Also Recommended for You...',
    },
  ];
  job: IScrapeLinks = {
    url: 'https://patclemons.com/inventory?dealer_id[]=1193&sortby=price&sortorder=asc&status=used&address=pat%20clemons%20inc.%20boone%20ia',
    urlAnchor: 'inventory',
  };

  key: string = 'u-MDC77sx-To3wxuEA_MLThIdeAv4wE3kW6B1wtie5_Y';

  constructor(private signalRService: ScrapingService) {}

  ngOnInit(): void {
    this.signalRService.startConnection(this.key + '-client');
    this.signalRService.scrapingLinkResultListener((result: IScrapingResultService[]) => {
      this.result.set(result);
      console.log(result);
    });
    this.signalRService.extractedLinksResultListener((result: IExtractedLinks[]) => {
      this.resultLink.set(result);
    });
  }

  sendScrape() {
    this.signalRService.sendLinkToBeScrape(this.key + '-service', this.job);
  }

  sendLink() {
    this.signalRService.sendLinkToExtract(this.urls);
  }
}
