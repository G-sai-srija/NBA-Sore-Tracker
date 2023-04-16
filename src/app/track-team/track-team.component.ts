import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { GameInfo, IEachResult, IGameResultDetails, ITeamNameDetails, ITeamResultDetails, TeamInfo } from '../constantypes/types';

@Component({
  selector: 'app-track-team',
  templateUrl: './track-team.component.html',
  styleUrls: ['./track-team.component.css']
})
export class TrackTeamComponent {
  teamNames:ITeamNameDetails[]=[]
  targetTeam:string=''
  lastTwelveDates:string[]=[]
  teamRecords: ITeamResultDetails[]=[]
  constructor(private router: Router, private api: ApiService ) {}

  ngOnInit(): void {
    this.getTeamsNames();
    this.lastTwelveDates=this.api.getLastTwelveDates();

    if (sessionStorage.getItem('storeSelectedTeams') != null) {
      this.teamRecords = JSON.parse(sessionStorage.getItem('storeSelectedTeams')!);
      this.targetTeam = JSON.parse(sessionStorage.getItem('storecurrentTeamName')!)
    }
  }

  getTeamsNames(){
    this.api.teamNames().subscribe((result:TeamInfo)=>{
       this.teamNames=result.data
    });
  }

  trackTeam(){
    let isIdPresent: boolean = false;

    isIdPresent = this.teamRecords.some((element: ITeamResultDetails) => element.id === Number(this.targetTeam));
    if (!isIdPresent) {
      this.fetchGameResults(this.targetTeam);
    }
  }

  fetchGameResults(teamID : string){
    this.api.getLast12GameResult(teamID,this.lastTwelveDates).subscribe((result:GameInfo)=>{
      const getTeamDetails= this.teamNames.find((element: ITeamNameDetails) => element.id === Number(this.targetTeam));
      let tempTeamFinalResult: string[] = [];
      let tempTeamResultScores: IEachResult[]=[];
      let teamScored:number=0
      let teamConceded:number=0
      result.data.forEach((element:IGameResultDetails) => {
          const isHomeTeamid = element.home_team.id === Number(this.targetTeam) ? true : false
          teamScored = isHomeTeamid ? teamScored + element.home_team_score : teamScored + element.visitor_team_score;
          teamConceded = isHomeTeamid ? teamConceded + element.visitor_team_score : teamConceded + element.home_team_score;
          let finalResult = isHomeTeamid ? this.checkWinOrLoss(element.home_team_score , element.visitor_team_score) :  this.checkWinOrLoss(element.visitor_team_score , element.home_team_score)
          tempTeamFinalResult.push(finalResult)
          let item={ homeTeam:element.home_team.abbreviation ,visitorTeam: element.visitor_team.abbreviation, homeTeamScore: element.home_team_score, visitorTeamScore: element.visitor_team_score}
          tempTeamResultScores.push(item)
      });
         let avgScored = Math.round(teamScored/result.data.length)
         let avgConceded= Math.round(teamConceded/result.data.length)
    
    let temp : ITeamResultDetails ={  
      name: getTeamDetails?.full_name || '',
      abbreviation: getTeamDetails?.abbreviation || '',
      conference: getTeamDetails?.conference || '',
      id: getTeamDetails?.id || 0,
      finalResult: tempTeamFinalResult,
      resultScores: tempTeamResultScores,
      avgTeamScored: avgScored,
      avgTeamConceded: avgConceded
    }
    this.teamRecords.push(temp)
    })
  }
  

  checkWinOrLoss(ourTeam:number,oppositeTeam:number):string{
    return ourTeam > oppositeTeam ? 'W' : 'L'
  }

  removeSelectedTeam(index:number){
    this.teamRecords.splice(index, 1);
    sessionStorage.setItem('storeSelectedTeams', JSON.stringify(this.teamRecords));
  }

  goToResultsPage(teamDetails:ITeamResultDetails){
    this.router.navigateByUrl(`results/${teamDetails.id}`);
    
    sessionStorage.setItem('storecurrentTeamName', JSON.stringify(this.targetTeam));
    sessionStorage.setItem('storeSelectedTeams', JSON.stringify(this.teamRecords));
    sessionStorage.setItem('showEachResult', JSON.stringify(teamDetails));
  }
}
