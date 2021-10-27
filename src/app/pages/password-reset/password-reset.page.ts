import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
  resetForm: FormGroup;
  constructor(public toastController: ToastController, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      user: [null, [Validators.required]]
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 700
    });
    toast.present();
  }

  submit() {
    if (!this.resetForm.valid) {
      return;
    }
    this.presentToast("Se han enviado las instrucciones a su correo electronico.");
    this.router.navigate(['/login']);
  }

  restablecer() {
    if (!this.resetForm.valid) {
      return;
    }
  }

  volver() {
    this.router.navigate(['/login']);
  }
}
