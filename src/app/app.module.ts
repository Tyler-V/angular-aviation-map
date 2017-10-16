import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { MapToolbarComponent } from './components/map/toolbar/map-toolbar.component';

import { SharedService } from './shared/shared.service';
import { BasemapsComponent } from './components/map/basemaps/basemaps.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { MapPreviewComponent } from './components/map/basemaps/map-preview/map-preview.component';
import { OverlaysComponent } from './components/map/overlays/overlays.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapToolbarComponent,
    BasemapsComponent,
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    MapPreviewComponent,
    OverlaysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
