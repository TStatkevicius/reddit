
// import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { Data } from '@angular/router';
import { HttpClient } from '@angular/common/http';





@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  topic: any;
  counter: string;
  Data: string;
  selectedTopic: string;
  selectedCount: number;
  urllink: Array<string> = [];
  permalinks: Array<string> = [];
  photoUrllink: Array<string> = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getConfig()
    .then((res) => {
      res.data.children.map(Data => this.urllink.push(Data.data.url));
    });


  }

  public getConfig(): Promise<any> {
    const url = 'https://www.reddit.com/reddits.json';
    return this.http.get(url).toPromise();
  }

  public getdata(): Promise<any> {
    const url = 'https://www.reddit.com/' + this.selectedTopic + '.json?&show=all&limit=' + this.selectedCount;
    return this.http.get(url).toPromise();
  }

  public getPhotoData(): Promise<any> {
    const url = 'https://www.reddit.com/' + this.selectedTopic + '.json?&show=all&limit=' + this.selectedCount;
    if (url) {
    return this.http.get(url).toPromise();
    }
  }

  public setName(data: any) {
    this.selectedTopic = data;
  }

  public setCounter(data: any) {
    this.selectedCount = data;
  }

  public navigateToRedit() {
    this.getdata()
      .then((res) => {
        res.data.children.map(content => this.permalinks.push(content.data.permalink));
      });

  }

  public showData() {
    this.photoUrllink.fill('');
    this.getPhotoData()
      .then((res) => {
        res.data.children.map(content => this.photoUrllink.push(content.data.url));
      });
  }
}
