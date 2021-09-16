import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  alumno: any;//variable de tipo any, es decir recibe cualquier tipo de dato naizu
  constructor(public toastController: ToastController, private activeRoute: ActivatedRoute, private router: Router) {
    //llamada de ruta activa+verificacion de parametros(extra y state)
    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.alumno = this.router.getCurrentNavigation().extras.state.user;
        console.log(this.alumno)
      }
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 700
    });
    toast.present();
  }

  logout() {
    this.router.navigate(['/login']);
    this.presentToast("Se ha cerrado sesión correctamente");
  }
}