import { Component, OnInit } from '@angular/core';

import { MenuService } from './services/menu.service';
import { TableService } from './services/table.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  version: string = "2.00"

  constructor(
    private menuService: MenuService,
    private tableService: TableService
  ) { }

  ngOnInit(): void {
    this.checkVersion();
    this.FindSavedSettings();
    this.getMenu();
  }

  checkVersion() {
    let current_version = localStorage.getItem("version");
    if (!current_version || current_version !== this.version) {
      localStorage.removeItem('language')
      localStorage.removeItem('category')
      localStorage.removeItem('background')
      localStorage.setItem("version", this.version)
    }
  }

  FindSavedSettings() {

    const token = localStorage.getItem("token");
    if (token) {
      this.menuService.token = token
    }

    const category = localStorage.getItem('category');
    if (category) {
      this.menuService.category = category
    }

    const background = localStorage.getItem('background');
    if (background) {
      this.menuService.background = background
    }

  }

  getMenu() {


    this.menuService.get().subscribe(
      (data) => {
        this.menuService.main_categories = data.categories
        localStorage.setItem("main_categoris", JSON.stringify(data.categories))
        this.menuService.mapCategories();
        this.menuService.main_menu = data.menu
        localStorage.setItem("main_menu", JSON.stringify(data.menu))
        this.menuService.setMenu();
        if (data.token) {
          localStorage.setItem("token", data.token);
          this.menuService.token = data.token
        }
        this.checkCode();
      },
      error => {
        console.log(error)
      }
    )




  }

  checkCode() {
    const code = localStorage.getItem("code")
    if (code) {
      this.tableService.activateTable(code, this.menuService.token!).subscribe(
        data => {
          this.tableService.table = data
        },
        error => {
          localStorage.removeItem("code")
          console.warn(error)
        }
      )
    }
  }


}
