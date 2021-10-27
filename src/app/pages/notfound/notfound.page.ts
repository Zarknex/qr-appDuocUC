import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.page.html',
  styleUrls: ['./notfound.page.scss'],
})
export class NotfoundPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  volver() {
    this.router.navigate(['/login']);
  }

}
