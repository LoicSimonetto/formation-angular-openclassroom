import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {
  userEmail: string = 'lolo.sitto@gmail.com';

  ngOnInit(): void {

  }
  
  onSubmitForm(form: NgForm): void {
    console.log(form.value);
  }
}
