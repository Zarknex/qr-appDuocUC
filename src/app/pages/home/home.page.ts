/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController, Platform } from '@ionic/angular';
import jsQR from 'jsqr';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  alumno: any; //variable de tipo any, es decir recibe cualquier tipo de dato
  scanActive = false;
  scanResult = null;
  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @ViewChild('fileinput', { static: false }) fileinput: ElementRef;

  videoElement: any;
  canvasElement: any;
  canvasContext: any;

  loading: HTMLIonLoadingElement;

  constructor(
    public toastCtrl: ToastController,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
    private plt: Platform
  ) {
    //llamada de ruta activa+verificacion de parametros(extra y state)
    this.activeRoute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.alumno = this.router.getCurrentNavigation().extras.state.user;
      }
    });
    //This will hide the scan functionality lol (iOS)!
    const isInStandaloneMode = () =>
      // eslint-disable-next-line @typescript-eslint/dot-notation
      'standalone' in window.navigator && window.navigator['standalone'];
    if (this.plt.is('ios') && isInStandaloneMode()) {
      console.log('I am a an iOS PWA!');
    }
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 700,
    });
    toast.present();
  }

  logout() {
    this.router.navigate(['/login']);
    this.presentToast('Se ha cerrado sesión correctamente');
  }

  //QR Scan code
  ngAfterViewInit() {
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
  }

  captureImage() {
    this.fileinput.nativeElement.click();
  }

  handleFile(files: FileList) {
    const file = files.item(0);

    const img = new Image();
    img.onload = () => {
      this.canvasContext.drawImage(
        img,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });

      if (code) {
        this.scanResult = code.data;
        this.showQrToast();
      }
    };
    img.src = URL.createObjectURL(file);
  }
  async startScan() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'enviroment' },
    });
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline', true);
    this.loading = await this.loadingCtrl.create({});
    await this.loading.present();
    this.videoElement.play();
    requestAnimationFrame(this.scan.bind(this));
  }

  async scan() {
    console.log('SCAN');
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }

      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });
      console.log('code', code);

      if (code) {
        this.scanActive = false;
        this.scanResult = code.data;
        this.showQrToast();
      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }
    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
  }

  stopScan() {
    this.scanActive = false;
  }

  reset() {
    this.scanResult = null;
  }

  async showQrToast() {
    const toastCtrl = await this.toastCtrl.create({
      message: `Open ${this.scanResult}?`,
      position: `top`,
      buttons: [
        {
          text: `Open`,
          handler: () => {
            window.open(this.scanResult, '_system', 'location=yes');
          },
        },
      ],
    });
  }
}
