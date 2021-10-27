import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotfoundPageRoutingModule } from './notfound-routing.module';

import { NotfoundPage } from './notfound.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotfoundPageRoutingModule,
    ComponentsModule,
    MatButtonModule
  ],
  declarations: [NotfoundPage]
})
export class NotfoundPageModule {}
