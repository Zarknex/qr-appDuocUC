import { Component } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private permissions: AndroidPermissions
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.permissions.checkPermission(this.permissions.PERMISSION.CAMERA).then((result)=>{
      if(!result.hasPermission) {
        this.permissions.requestPermission(this.permissions.PERMISSION.CAMERA);
      }
    }, (err) => {
      this.permissions.requestPermission(this.permissions.PERMISSION.CAMERA);
    }
    );
  };
}
