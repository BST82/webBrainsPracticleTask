import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //read data from backend
  private urlBlog = 'http://localhost:3000/blog';

  constructor(private http:HttpClient) { }

  //read the data
  getBlog():Observable<any>{
    return this.http.get<any>(this.urlBlog);
  }

  // insert the data
  addBlog(data:any):Observable<any>{
    return this.http.post<any>(this.urlBlog,data);
  }

  //update the data
  updateBlog(id:string, data: any):Observable<any>{
    return this.http.put<any>(`${this.urlBlog}/${id}`,data);
  }

  // delete the data
  deleteBlog(id:string):Observable<any>{
    return this.http.delete<any>(`${this.urlBlog}/${id}`);
  }
}
