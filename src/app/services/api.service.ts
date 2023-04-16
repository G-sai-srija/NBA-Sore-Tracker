import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GameInfo, TeamInfo } from '../constantypes/types';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  API_ENDPOINT = environment.apiUrl;
  header = new HttpHeaders({
    'X-RapidAPI-Key': environment.apiKey,
    'X-RapidAPI-Host': environment.apiHost,
  });

  teamNames(): Observable<TeamInfo> {
    return this.http.get<TeamInfo>(`${this.API_ENDPOINT}/teams`, {
      headers: this.header,
    });
  }

  getLastTwelveDates(): string[] {
    const datePipe = new DatePipe('en-US');
    const last12Dates: string[] = [];
    for (let i = 1; i <= 12; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = datePipe.transform(date, 'yyyy-MM-dd');
      last12Dates.push(formattedDate!);
    }
    return last12Dates
  }
   
  getLast12GameResult(teamID:string, lastTwelveDate:string[]) : Observable<GameInfo>{
    let parameters: HttpParams = new HttpParams();
      lastTwelveDate.forEach((date: string) => {
        parameters = parameters.append('dates[]', date);
      });
      parameters = parameters.append('team_ids[]',teamID);
      return this.http.get<GameInfo>(`${this.API_ENDPOINT}/games`, {headers: this.header,params: parameters});
  }

}
