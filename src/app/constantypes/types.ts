export interface ITeamNameDetails {
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    id: number;
    name: string;
}


export interface TeamInfo {
    data: ITeamNameDetails[];
}

export interface ITeamResultDetails {
    name: string;
    abbreviation: string;
    conference: string;
    id: number;
    finalResult: Array<string>;
    resultScores: IEachResult[];
    avgTeamScored: number;
    avgTeamConceded: number;
}

export interface IEachResult{
        homeTeam: string;
        visitorTeam: string;
        homeTeamScore: number;
        visitorTeamScore: number;
}

export interface IGameResultDetails {
    id: number;
    date: string;
    home_team: ITeamNameDetails;
    home_team_score: number;
    visitor_team: ITeamNameDetails;
    visitor_team_score: number;
    season: number;
    period: number;
    postseason: boolean;
    status: string;
    time: string;
  }

  export interface GameInfo {
    data: IGameResultDetails[];
}