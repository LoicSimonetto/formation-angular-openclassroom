import { Component, Input } from '@angular/core';
import { FaceSnap } from '../../../core/models/face-snap.models';
import { MyServiceService } from '../../../core/services/my-service.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss'
})
export class SingleFaceSnapComponent {
  //faceSnap!: FaceSnap;
  oFaceSnap$!: Observable<FaceSnap>;
  snaped!: boolean;
  buttonText!: string;

  constructor(private faceSnapService: MyServiceService,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.snaped = false;
    this.buttonText = "Liker.";
    const fsid = +this.route.snapshot.params['id'];
    this.oFaceSnap$ = this.faceSnapService.getFaceSnapById(fsid);
  }

  onAddSnap(fsid: number){
    if (this.snaped)
    {
      this.oFaceSnap$ = this.faceSnapService.SnapFaceSnapById(fsid, 'unsnap')
      .pipe(
        tap(() => {
          this.buttonText = "Liker."
          this.snaped = false;
        })
      )

      // this.faceSnapService.SnapFaceSnapById(fsid, 'unsnap').pipe(
      //   tap(() => {
      //     this.buttonText = "Liker."
      //     this.snaped = false;
      //     this.oFaceSnap$ = this.faceSnapService.getFaceSnapById(fsid);
      //   })
      // ).subscribe();
    }
    else{
      this.oFaceSnap$ = this.faceSnapService.SnapFaceSnapById(fsid, 'snap').pipe(
        tap(() => {
          this.buttonText = "Retirer le like."
          this.snaped = true;
        })
      )

      // this.faceSnapService.SnapFaceSnapById(fsid, 'snap').pipe(
      //   tap(() => {
      //     this.buttonText = "Retirer le like."
      //     this.snaped = true;
      //     this.oFaceSnap$ = this.faceSnapService.getFaceSnapById(fsid);
      //   })
      // ).subscribe();
    }
    
  }
}
