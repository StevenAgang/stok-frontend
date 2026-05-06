import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {
  IExtractedLinks,
  IScrapeLinks,
  IScrapingJobService,
  IScrapingResultService,
} from '../../interface/Hub/IScrapingService';

@Injectable({
  providedIn: 'root',
})
export class ScrapingService {
  private hubConnection!: signalR.HubConnection;

  public startConnection = (keys: string) => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7012/scrapinghub?key=${keys}`)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection Started'))
      .catch(() => console.log('Error while starting connection'));
  };

  public scrapingLinkResultListener = (callback: (results: IScrapingResultService[]) => void) => {
    this.hubConnection.on('ReceivedScrapingLinkResult', (results) => {
      callback(results);
    });
  };

  public sendLinkToBeScrape = (key: string, url: IScrapeLinks) => {
    this.hubConnection.invoke('SendScrapeJob', key, url).catch((err) => console.log(err));
  };

  public extractedLinksResultListener = (callback: (results: IExtractedLinks[]) => void) => {
    this.hubConnection.on('ReceivedScrapingResult', (results) => {
      callback(results);
    });
  };

  public sendLinkToExtract = (url: IScrapingJobService[]) => {
    this.hubConnection.invoke('', url).catch((err) => console.log(err));
  };
}
