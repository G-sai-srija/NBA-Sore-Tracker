import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackTeamComponent } from './track-team.component';

describe('TrackTeamComponent', () => {
  let component: TrackTeamComponent;
  let fixture: ComponentFixture<TrackTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
