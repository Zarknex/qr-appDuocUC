import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LocaldbService } from '../services/localdb.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private localdb: LocaldbService) {
  }

  canActivate(): boolean{
    if (this.localdb.getToken()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
