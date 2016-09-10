import {Routes} from '@angular/router';
import {RepoList} from './github/repo-list/repo-list';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'github', pathMatch: 'full' },
  { path: 'github', component: RepoList },
];
