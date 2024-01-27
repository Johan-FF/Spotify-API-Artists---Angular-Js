import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsViewerComponent } from './artists-viewer.component';

describe('ArtistsViewerComponent', () => {
  let component: ArtistsViewerComponent;
  let fixture: ComponentFixture<ArtistsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistsViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
