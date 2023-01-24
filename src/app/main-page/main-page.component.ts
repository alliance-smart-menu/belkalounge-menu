import { Component, OnInit , HostListener} from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  
  @HostListener('window:resize', ['$event'])
  OnChangeHeight(){
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }


  options: AnimationOptions = {
    path: '/assets/animation/default_main.json',
  };

  html: any = {
    ru: {
      menu: "Меню",
      table: "Стол"
    },
    en: {
      menu: "Menu",
      table: "Table"
    }
  }

  constructor (
    public menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.windowHeigth();
  }

  windowHeigth() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  scroll() {
    const element = document.getElementById('categories')
    if (element !== null) {
      element.scrollIntoView({block: "center", behavior: "smooth"})
    }
  }

  setLanguage(lang: string) {
    this.menuService.language = lang
    localStorage.setItem('language', lang);

    this.setCost();
    this.menuService.mapCategories();
    this.menuService.setMenu();
  }

  setCost() {
    if (this.menuService.language == 'ru') {
      this.menuService.cost = "Лей"
    } else {
      this.menuService.cost = "MDL"
    }
  }

  languageColor(lang: string) {
    return this.menuService.language === lang ? 'lang_font red' : 'lang_font'
  }

  htmlSetting(tag: string) {

    if (this.menuService.language == "ru") {
      return this.html.ru[tag]
    } else {
      return this.html.en[tag]
    }

  }


}
