import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from "../../environments/environment";
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  public loading: boolean = false

  public table: any

  order: any[] = []



  constructor(
    private http: HttpClient,
    private menuService: MenuService
  ) { }

  orderAdd(position: any) {

    position.added = true

    let query =  {
      _id: position._id,
      name: position.name,
      quantity: 1
    }

    const orderPosition = Object.assign( {}, query)

    const candidate = this.order.find( data => data._id === orderPosition._id )

    if (candidate) {
      candidate.quantity++
    } else {
      this.order.push(orderPosition)
    }

    setTimeout(() => {
      position.added = false
    }, 1000);
    
  }

  remove(index: number) {
    this.order.splice(index, 1)
  }

  changeQuantity(index: number, type: string) {
    if (type === "+") {
      this.order[index].quantity++
    } else {
      this.order[index].quantity--
      if (this.order[index].quantity <= 0) {
        this.order.splice(index, 1)
      }
    }
  }

  clear() {
    localStorage.removeItem("code")
    this.table = undefined
    this.order = []
  }


  // API запросы
  activateTable(code: string, token: string): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/api/telegram/code`, {code, token, place: "BelkaLounge"})
  }

  call(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/api/telegram/call`, data)
  }

  check(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/api/telegram/check`, data)
  }

  hookah(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/api/telegram/hookah`, data)
  }

  doOrder(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/api/2606/telegram/order`, data)
  }

}

