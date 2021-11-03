import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderbannerComponent } from './headerbanner/headerbanner.component';


@NgModule({
  declarations: [HeaderbannerComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderbannerComponent]
})
export class ComponentsModule { }
