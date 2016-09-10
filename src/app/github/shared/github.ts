import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {mockData} from './mock-data';

@Injectable()
export class Github {
  search_url: string = 'search/repositories';
  rate_limit: string = 'rate_limit';
  full_url:string;
  fullPath:string;
  language;
  constructor(private http: Http) { }

  getRepos() {
    this.full_url=this.search_url+"?q=stars:>=0";
    return this.makeRequest(this.full_url);
  }

  getReposWithLang(lang:string) {
    this.full_url=this.search_url+"?q=stars:>=0+language:"+lang;
    return this.makeRequest(this.full_url);
  }
  getReposWithLangStars(lang:any, star:any) {
    if(lang=!undefined){
      this.language="+language:"+lang
    }else{
      this.language="";
    }
    this.full_url=this.search_url+"?q=stars:>="+star+this.language;
    return this.makeRequest(this.full_url);
  }
  getRateLimit() {
    return this.makeRequest(this.rate_limit);
  }

  getFilteredLanguages() {
    return mockData;
  }

  private makeRequest(path: string) {
    let params = new URLSearchParams();
    let url = `https://api.github.com/${path}`;
    return this.http.get(url, { search: params })
      .map((res) => res.json());
  }
}
