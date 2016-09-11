import {Component, OnInit, Pipe, Output, EventEmitter, ElementRef} from '@angular/core';
import {Github} from '../shared/github';
import {Observable} from 'rxjs/Observable';
import {MySearchFilter} from '../../searchFilter';

@Component({
  selector: 'repo-list',
  styleUrls: ['./repo-list.css'],
  templateUrl: './repo-list.html'
})
export class RepoList implements OnInit {
  repos: Observable<any>;
  rateLimit: Observable<any>;
  filteredLanguages: any[];
  dummyStars: any[] = ['0','10','50','100', '500', '1000', '1500', '2000', '5000', '10000', '20000', '30000', '50000'];
  lang: any;
  star: any="0";
  startTime:any=undefined;
  endTime:any= undefined;

  constructor(private github: Github, public element: ElementRef) {
  }
  ngOnInit() {
    this.getRepos();
    this.getRateLimit();
  }

  getRepos() {
    this.startTime = new Date();
    this.github.getRepos().subscribe((repos) => {
      this.repos = repos;
    });


  }
  getReposWithLang(lang) {
    this.lang = lang;
    this.github.getReposWithLang(this.lang).subscribe((repos) => {
      this.repos = repos;
      console.log(repos)
    });
  }

  getReposWithLangStars(star) {
    this.star = star;
    // if (!this.lang) {
    //   this.lang = "Java";
    // }
    // this.filteredLanguages= undefined;
    this.github.getReposWithLangStars(this.lang, star).subscribe((repos) => {
      this.repos = repos;
      console.log(repos)
    });
  }
  getRateLimit() {
    this.github.getRateLimit().subscribe((rateLimit) => {
      this.rateLimit = rateLimit;
      console.log(rateLimit)
    });
      this.endTime= new Date();
  }


  loadLanguages() {
    this.filteredLanguages = this.github.getFilteredLanguages();
    console.log(this.filteredLanguages);
  }

}
