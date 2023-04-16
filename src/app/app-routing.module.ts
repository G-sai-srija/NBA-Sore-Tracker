import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { TrackTeamComponent } from './track-team/track-team.component';

const routes: Routes = [
  {
    path:'',redirectTo:'/trackteam', pathMatch:'full',
  },
  {
    path:'trackteam',component:TrackTeamComponent
  },
  {
    path: 'results/:teamCode',component:ResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
