import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocaldbService } from 'src/app/services/localdb.service';
import { ApiclientService } from 'src/app/services/apiclient.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: string;
  password: string;
  loginForm: FormGroup;
  creds = { user: '', password: '' };
  constructor(
    public toastController: ToastController,
    private router: Router,
    private formBuilder: FormBuilder,
    private bdlocal: LocaldbService,
    private apiclient: ApiclientService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submit() {
    if (this.bdlocal.validLogin(this.user)) {
      //declaro e instancio un objeto de tipo NavigationExtras
      const navigationextras: NavigationExtras = {
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

  signIn() {
    this.creds = { user: this.user, password: this.password};
    this.apiclient.signInUser(this.creds)
      .subscribe(
        res => {
          console.log(res);
          this.bdlocal.saveToken(res.token);
          this.router.navigate(['/home']);
        },
        err => console.log(err)
      );
  }

  signUp() {
    this.creds = { user: this.user, password: this.password};
    console.log(this.creds);
    this.apiclient.signUpUser(this.creds).subscribe(res => {
      console.log(res);
      this.bdlocal.saveToken(res.token);
    },
    err => console.log(err));
  }

  guardarInput(){
    console.log(this.bdlocal.getToken());
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 700,
    });
    toast.present();
  }
}
