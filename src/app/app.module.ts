import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicStorageModule} from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { ApiclientService } from './services/apiclient.service';
import { LocaldbService } from './services/localdb.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule, IonicStorageModule.forRoot(), HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthGuard, ApiclientService, LocaldbService, AndroidPermissions
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {
}
