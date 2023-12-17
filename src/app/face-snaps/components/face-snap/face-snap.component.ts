import { Component, OnInit, Input, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaceSnap } from '../../../core/models/face-snap.models';
import { MyServiceService } from '../../../core/services/my-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }]
})
export class FaceSnapComponent implements OnInit {
  @Input() faceSnap!: FaceSnap;
  snaped!: boolean;
  buttonText!: string;

  constructor(private faceSnapService: MyServiceService,
              private router: Router){}

  ngOnInit(): void {
    this.snaped = false;
    this.buttonText = "Liker.";
  }

  onAddSnap(){
    if (this.snaped)
    {
      this.buttonText = "Liker."
      this.snaped = false;
      this.faceSnapService.SnapFaceSnapById(this.faceSnap.id, 'unsnap');
    }
    else{
      this.buttonText = "Retirer le like."
      this.snaped = true;
      this.faceSnapService.SnapFaceSnapById(this.faceSnap.id, 'snap');
    }
  }
  url!: string;
  OnViewFaceSnap(){
    this.url = `facesnaps/${this.faceSnap.id}`;
    this.router.navigateByUrl(this.url);
  }
}
