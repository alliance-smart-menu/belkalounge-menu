import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import {Observable} from 'rxjs'
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  public token: string | undefined

  public loading: boolean = false

  public language: string = "ru"
  public cost: string = "Лей"

  main_categories: any[] | undefined
  main_menu: any[] | undefined

  public categories: any[] | undefined

  public category: string | undefined
  public background: string | undefined
  public menu: any


  setCost() {
    if (this.language == 'ru') {
      this.cost = "Лей"
    } else {
      this.cost = "MDL"
    }
  }

  mapCategories() {

    this.categories = this.main_categories!.map((item) => {

      let category: any = {
        _id: item._id,
        background: item.background,
        image: item.image
      }
      if (this.language === 'ru') {
        category.name = item.name.ru
      } else {
        category.name = item.name.en
      }

      return category
    })

    if (!this.category) {
      this.category = this.categories[0]._id
      this.background = this.categories[0].background
    } else {
      const candidate = this.categories.find((category) => category._id === this.category)
      if (!candidate) {
        this.category = this.categories[0]._id
        this.background = this.categories[0].background
      }
    }

  }

  setMenu() {
    this.loading = true
    const obj = this.main_menu!.find(item => item.category === this.category);
    this.menu = obj.sub_categories.map((item: any) => {
      let sub_category: any = {
        adult: item.adult,
      }

      if (this.language === 'ru') {
        sub_category.name = item.name.ru
      } else {
        sub_category.name = item.name.en
      }

      sub_category.positions = item.positions.map((data: any) => {

        let position: any = {
          _id: data._id,
          access: data.access,
          cost: data.cost ? data.cost : undefined
        }

        if (this.language === 'ru') {
          position.name = data.name.ru

          if (data.description) {
            position.description = data.description.ru
          }

          if (data.sub_name) {
            position.sub_name = data.sub_name.ru
          }

        } else {
          position.name = data.name.en

          if (data.description) {
            position.description = data.description.en
          }

          if (data.sub_name) {
            position.sub_name = data.sub_name.en
          }

        }

        return position

      })

      return sub_category
    })

    setTimeout(() => {
      this.loading = false
    }, 500);

  }


  // API запросы
  get(): Observable<any> {
    
    let queryParams = new HttpParams();

    if (this.token) {
      queryParams = queryParams.append("token", this.token);
    }

    return this.http.get<any>(`${environment.apiURL}/api/2606/menu`, {params: queryParams})
  }

  

}
