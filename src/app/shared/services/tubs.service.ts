import { Injectable } from '@angular/core';
import {  HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Product, EditProduct } from '../models/product-model';
import { ApiService } from './api.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const params = new HttpParams()
  .set('orderBy', '"$key"')
  .set('limitToFirst', '1');

@Injectable({
  providedIn: 'root'
})
export class TubsService {
  private ProductRootApiUrl = '/products';

  // variable
  products: string[];
  product: EditProduct;

  uploadAPI = environment.uploadUrl;
  // selectedFile: File = null;

  currentUploadURL: string;

  productObservable: Observable<Product[]>;

  constructor(private apiSvc: ApiService) { }

  // uploadFile() {
  //   const fd = new FormData;
  //   fd.append('image', this.selectedFile, this.selectedFile.name);
  //   return this.apiSvc.post(this.uploadAPI, this.selectedFile);
  // }
  addProduct(p): Observable<any> {
    console.log('posting new product');
    return this.apiSvc.post(this.ProductRootApiUrl, p);
  }

  public getProducts(): Observable<Product[]> {
    console.log('getting products data from api>>>');
    return this.apiSvc
    .get(this.ProductRootApiUrl, params )
    .pipe(
      catchError(this.handleError('getting products list error'))
    );
  }
  public getProductById(idValue): Observable<any> {
    console.log('>>>>getProductById');
    return this.apiSvc
      .get(`${this.ProductRootApiUrl}/${idValue}`)
      .pipe(
        map(products => products[0]),
        catchError(this.handleError('get product by id error'))
      );
  }

  updateProduct(p): Observable<EditProduct> {
    return this.apiSvc
      .put(this.ProductRootApiUrl, p)
      .pipe(
        catchError(this.handleError<EditProduct>('updating product error'))
      );
  }

  deleteProduct(idValue): Observable<EditProduct> {
    return this.apiSvc
      .delete(`${this.ProductRootApiUrl}/${idValue}`)
      .pipe(
        catchError(this.handleError<Product>('deleting product error'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
