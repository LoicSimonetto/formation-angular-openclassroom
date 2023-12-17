import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap.models';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private httpClient: HttpClient){

  }

  myFaceSnaps:FaceSnap[] = [
    {
      id: 1,
      title: 'Eusèbe',
      description: 'Le lapin de "De cape et de crocs."',
      snaps: 15,
      createdDate: new Date(),
      imageUrl: 'https://www.decape.askell.com/Persos/Eusebe.jpg',
      location: 'Venise'
    },
    {
      id: 2,
      title: 'Don Lope',
      description: 'Loup andalou, hidalgo, il est fier et courageux, voire même parfois téméraire...',
      snaps: 0,
      createdDate: new Date(),
      imageUrl: 'https://www.decape.askell.com/Persos/Lope.gif'
    },
    {
      id: 3,
      title: 'Raïs Kader',
      description: '" Kader le janissaire, jadis émissaire, aujourd\'hui corsaire ... " ainsi se définit le capitaine ottoman.',
      snaps: 0,
      createdDate: new Date(),
      imageUrl: 'https://www.decape.askell.com/Persos/kader.jpg'
    }
  ];

  getAllFaceSnaps(): Observable<FaceSnap[]>
  {
    return this.httpClient.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }

  getFaceSnapById(fsid: number): Observable<FaceSnap> {
    return this.httpClient.get<FaceSnap>('http://localhost:3000/facesnaps/'+ fsid);
    // const faceSnap = this.myFaceSnaps.find(fs => fs.id === fsid);
    // if (faceSnap){
    //   return faceSnap;
    // } else {
    //   throw new Error('FaceSnap introuvable.');
    // }
  }

  SnapFaceSnapById(fsid: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
    return this.getFaceSnapById(fsid).pipe(
      map(fs => ({
        ...fs,
        snaps: fs.snaps + (snapType === 'snap' ? 1 : -1)
      })),
      switchMap(nfs => this.httpClient.put<FaceSnap>('http://localhost:3000/facesnaps/'+ fsid,nfs))
    );
    
    
    // const faceSnap = this.myFaceSnaps.find(fs => fs.id === fsid);
    // if (faceSnap){
    //   faceSnap.snaps += snapType === 'snap' ?  1 : -1;
    // } else {
    //   throw new Error('FaceSnap introuvable. Impossible de ' 
    //                   + (snapType === 'snap' ? 'snaper' : 'désnaper'));
    // }
  }

  AddNewFaceSnap(formValue: {title: string, description: string, imageUrl: string, location?: string}): Observable<FaceSnap> {
    return this.getAllFaceSnaps().pipe(
      map(fss => [...fss].sort((fs1: FaceSnap, fs2: FaceSnap) => fs1.id - fs2.id)),
      map(sortedFss => sortedFss[sortedFss.length-1]),
      map(previousFs => ({
        ...formValue,
        createdDate : new Date(),
        snaps: 0,
        id: previousFs.id + 1
      })),
      switchMap(nfs => this.httpClient.post<FaceSnap>('http://localhost:3000/facesnaps/',nfs))
    )
    
    const faceSnap: FaceSnap = {
      ...formValue,
      createdDate: new Date(),
      snaps: 0,
      id: this.myFaceSnaps[this.myFaceSnaps.length - 1].id + 1
    }
    this.myFaceSnaps.push(faceSnap);
  }
}
