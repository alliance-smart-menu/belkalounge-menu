import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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

  constructor (public menuService: MenuService) {}

  ngOnInit(): void {
    
  }

  htmlSetting(tag: string) {

    if (this.menuService.language == "ru") {
      return this.html.ru[tag]
    } else {
      return this.html.en[tag]
    }

  }

  

}
