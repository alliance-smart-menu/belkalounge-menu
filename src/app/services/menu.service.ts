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

  public category_loading: boolean = false
  public menu_loading: boolean = false


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

    this.category_loading = true

    this.categories = this.main_categories!.map((item) => {

      let category: any = {
        _id: item._id,
        background: item.background,
        image: item.image,
        name: item.name
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

    setTimeout(() => {
      this.category_loading = false
    }, 1400);

  }

  setMenu() {
    this.menu_loading = true

    const obj = this.main_menu!.find(item => item.category === this.category);

    this.menu = obj.sub_categories.map((item: any) => {
      let sub_category: any = {
        adult: item.adult,
        name: item.name
      }

      sub_category.positions = item.positions.map((data: any) => {

        let position: any = {
          _id: data._id,
          access: data.access,
          cost: data.cost ? data.cost : undefined,
          new_cost: data.new_cost ? data.new_cost : undefined,
          name: data.name,
        }


        if (data.description) {
          position.description = data.description
        }

        if (data.sub_name) {
          position.sub_name = data.sub_name
        }



        return position

      })

      return sub_category
    })

    setTimeout(() => {
      this.menu_loading = false
    }, 1000);

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
