import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: String;
  loginForm: FormGroup;
  constructor(public toastController: ToastController, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user: [null, [Validators.required]],
      password: [null, Validators.required]
    });
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    //declaro e instancio un objeto de tipo NavigationExtras
    let navigationextras: NavigationExtras = {
      state: { user: this.user } //asigno obj con clave y valor
    }
    //Ingresara a la page Home, usando la API Router para llamar a otra page+parametro
    this.presentToast("Bienvenido " + this.user);
    this.router.navigate(['/home'], navigationextras)
    console.log(this.loginForm.value);
  }

  restablecer() {
    this.router.navigate(['/password-reset']);
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 700
    });
    toast.present();
  }
}
