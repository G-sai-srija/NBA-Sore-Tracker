import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ITeamResultDetails } from '../constantypes/types';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  displayResult:ITeamResultDetails ={
    name: '',
    abbreviation:'',
    conference: '',
    id: 0,
    finalResult: [''],
    resultScores: [],
    avgTeamScored: 0,
    avgTeamConceded: 0,
  };

  constructor(private router: Router) {
    this.displayResult = JSON.parse(sessionStorage.getItem('showEachResult')!);
    
  }

}
