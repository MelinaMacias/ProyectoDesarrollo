
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Menu } from '../../models/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private http: HttpClient
  ) { }

  getAllPlates() {
    return this.http.get<Menu[]>(`${environment.main_url}/platos`);
  }

}
