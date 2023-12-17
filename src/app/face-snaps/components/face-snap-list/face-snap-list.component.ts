import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaceSnap } from '../../../core/models/face-snap.models';
import { FaceSnapComponent } from '../face-snap/face-snap.component';
import { MyServiceService } from '../../../core/services/my-service.service';
import { Observable, Subject, interval, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-face-snap-list',
    standalone: true,
    templateUrl: './face-snap-list.component.html',
    styleUrl: './face-snap-list.component.scss',
    imports: [CommonModule, FaceSnapListComponent, FaceSnapComponent]
})

export class FaceSnapListComponent implements OnInit, OnDestroy {
  
  myFaceSnaps!: FaceSnap[];
  faceSnaps$!: Observable<FaceSnap[]>;
  private Destroy$! : Subject<boolean>;


  constructor(private faceSnapService: MyServiceService){

  }

  ngOnDestroy(): void {
    this.Destroy$.next(true);
  }

  ngOnInit(): void {
    this.Destroy$ = new Subject<boolean>();
    
    //this.myFaceSnaps = this.faceSnapService.getAllFaceSnaps();
    this.faceSnaps$ = this.faceSnapService.getAllFaceSnaps();

    interval(1000).pipe(
      takeUntil(this.Destroy$),
      tap(console.log)
    ).subscribe();
  }
}
