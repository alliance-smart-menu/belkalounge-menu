import { Component, OnInit } from '@angular/core';

import { TableService } from '../services/table.service';
import { MenuService } from '../services/menu.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.css']
})
export class TablePageComponent implements OnInit  {

  pennding: boolean = false

  code: string | undefined 

  error: string | undefined
  message: string | undefined

  html: any = {
    ru: {
      enter_code: "Введите код активации",
      activate_button: "Активировать",
      order: "Заказ",
      send: "Отправить",
      officiant: "Официант",
      hookah: "Кальянщик",
      cash: "Наличные",
      card: "Картой",
      payment: "К оплате"
    },
    en: {
      enter_code: "Enter activation code",
      activate_button: "Activate",
      order: "Order",
      send: "Send",
      officiant: "Officiant",
      hookah: "Hookah",
      cash: "Cash",
      card: "Card",
      payment: "To Payment"
    }
  }

  constructor(
    public tableService: TableService,
    public menuService: MenuService
  ) {}

  ngOnInit(): void {
  }

  activate() {
    this.pennding = true

    this.tableService.activateTable(this.code!, this.menuService.token!).subscribe(
      data => {
        this.tableService.table = data
        localStorage.setItem("code", this.code!)
        this.pennding = false
      },
      error => {
        console.warn(error)
        this.error = error.error
        setTimeout(() => {
          this.error = undefined
          this.code = undefined
          this.tableService.clear()
          this.pennding = false
        }, 3000);
      }
    )

  }

  call() {
    this.pennding = true

    this.tableService.call(this.tableService.table).subscribe(
      data => {

        this.message = data
        setTimeout(() => {
          this.message = undefined
        }, 5000);

        this.pennding = false

      },
      error => {
        this.message = error.error
        setTimeout(() => {
          this.message = undefined
          this.tableService.clear()
        }, 5000);
        this.pennding = false
      }
    )

  }


  check() {
    this.pennding = true

    this.tableService.check(this.tableService.table).subscribe(
      data => {

        this.message = data
        setTimeout(() => {
          this.message = undefined
        }, 5000);

        this.pennding = false

      },
      error => {
        this.message = error.error
        setTimeout(() => {
          this.message = undefined
          this.tableService.clear()
        }, 5000);
        this.pennding = false
      }
    )

  }

  hookah() {
    this.pennding = true

    this.tableService.hookah(this.tableService.table).subscribe(
      data => {

        this.message = data
        setTimeout(() => {
          this.message = undefined
        }, 5000);

        this.pennding = false

      },
      error => {
        this.message = error.error
        setTimeout(() => {
          this.message = undefined
          this.tableService.clear()
        }, 5000);
        this.pennding = false
      }
    )

  }

  order() {
    this.pennding = true

    const data = {
      chat_id: this.tableService.table.chat_id,
      name: this.tableService.table.name,
      table: this.tableService.table.table,
      code: this.tableService.table.code,
      order: this.tableService.order
    }

    this.tableService.doOrder(data).subscribe(
      data => {

        this.tableService.order = []

        this.message = data
        setTimeout(() => {
          this.message = undefined
        }, 5000);

        this.pennding = false

      },
      error => {
        this.message = error.error
        setTimeout(() => {
          this.message = undefined
          this.tableService.clear()
        }, 5000);
        this.pennding = false
      }
    )
  }
  
  htmlSetting(tag: string) {

    if (this.menuService.language == "ru") {
      return this.html.ru[tag]
    } else {
      return this.html.en[tag]
    }

  }


}
