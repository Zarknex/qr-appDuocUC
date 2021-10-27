import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderbannerComponent } from './headerbanner/headerbanner.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [HeaderbannerComponent, PageNotFoundComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderbannerComponent, PageNotFoundComponent]
})
export class ComponentsModule { }
