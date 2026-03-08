import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ApiService {

  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}


  private request<T>(method: string, url: string, body?: any) {
    return this.http.request<T>(method, this.base + url, {
      body
    }).pipe(
      catchError(err => {
        return throwError(() => err.error); // <-- critical
      })
    );
  }

  post<T>(url: string, body: any) {
    return this.request('POST', url, body);
  }

  get<T>(url: string) {
    return this.request('GET', url);
  }
}
