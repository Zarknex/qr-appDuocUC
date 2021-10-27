import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocaldbService } from 'src/app/services/localdb.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: string;
  pass: string;
  loginForm: FormGroup;
  constructor(
    public toastController: ToastController,
    private router: Router,
    private formBuilder: FormBuilder,
    private bdlocal: LocaldbService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submit() {
    if (this.bdlocal.validLogin(this.user, this.pass)) {
      //declaro e instancio un objeto de tipo NavigationExtras
      let navigationextras: NavigationExtras = {
        state: { user: this.user }, //asigno obj con clave y valor
      };
      //Ingresara a la page Home, usando la API Router para llamar a otra page+parametro
      this.presentToast('Bienvenido ' + this.user);
      this.router.navigate(['/home'], navigationextras);
      console.log(this.loginForm.value);
    }
  }

  restablecer() {
    this.router.navigate(['/password-reset']);
  }

  testAccount() {
    this.bdlocal.saveUser('test1', 'testpass1');
  }

  guardarInput() {
    console.log(this.bdlocal.saveUser(this.user, this.pass));
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 700,
    });
    toast.present();
  }
}
