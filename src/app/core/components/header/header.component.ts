import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnSameUrlNavigation, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  //standalone: true,
  //imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  
  constructor(private router: Router){}
  
  ngOnInit(): void {
  }

  onAddNexFaceSnap(): void {
    this.router.navigateByUrl('facesnaps/create');
  }
}
