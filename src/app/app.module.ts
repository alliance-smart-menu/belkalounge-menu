import { NgModule, LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
registerLocaleData(localeRu);

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

import { MainPageComponent } from './main-page/main-page.component';

import { MenuPageComponent } from './menu-page/menu-page.component';
import { TablePageComponent } from './table-page/table-page.component';
import { HeaderComponent } from './shared/header/header.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MenuPageComponent,
    TablePageComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [
    { 
      provide: LOCALE_ID, 
      useValue: 'ru' 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
