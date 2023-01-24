import { AfterViewInit, Component, OnInit,  } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { TableService } from '../services/table.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit, AfterViewInit {

  loading: boolean = false
  reloading: boolean = false


  menu: any

  constructor(
    public menuService: MenuService,
    public tableService: TableService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.scroll();
  }

  scroll() {
    const element = document.getElementById('categories')
    if (element !== null) {
      element.scrollIntoView({block: "center", behavior: "smooth"})
    }
  }
 

  setCategory(category: any) {
    this.menuService.category = category._id
    localStorage.setItem('category', category._id);
    this.menuService.background = category.background
    localStorage.setItem('background', category.background)
    this.menuService.setMenu();
  }


  categoryColor(_id: string) {
    return this.menuService.category === _id ? 'category-name red' : 'category-name'
  }

}
