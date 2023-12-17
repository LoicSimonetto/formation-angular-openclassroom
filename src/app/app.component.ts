import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaceSnapListComponent } from './face-snaps/components/face-snap-list/face-snap-list.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FaceSnap } from './core/models/face-snap.models';
import { Observable, concatMap, delay, exhaustMap, filter, interval, map, mergeMap, of, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  interval$!: Observable<string>;
  redTrainsCalled = 0;
  yellowTrainsCalled = 0;

  ngOnInit(): void {
    // interval(500).pipe(
    //   take(10),
    //   map(value => value % 2 === 0 ? 'rouge' : 'jaune'),
    //   tap(color => console.log(`La lumière s'allume en %c${color}`, `color: ${this.translateColor(color)}`)),
    //   switchMap(color => this.getTrainObservable$(color)),
    //   tap(train => console.log(`Train %c${train.color} ${train.trainIndex} arrivé !`, `font-weight: bold; color: ${this.translateColor(train.color)}`))
    // ).subscribe();
  }
  getTrainObservable$(color: 'rouge' | 'jaune') {
    const isRedTrain = color === 'rouge';
    isRedTrain ? this.redTrainsCalled++ : this.yellowTrainsCalled++;
    const trainIndex = isRedTrain ? this.redTrainsCalled : this.yellowTrainsCalled;
    console.log(`Train %c${color} ${trainIndex} appelé !`, `text-decoration: underline; color: ${this.translateColor(color)}`);
    return of({ color, trainIndex }).pipe(
      delay(isRedTrain ? 5000 : 6000)
    );
  }

  translateColor(color: 'rouge' | 'jaune') {
    return color === 'rouge' ? 'red' : 'yellow';
  }
}
