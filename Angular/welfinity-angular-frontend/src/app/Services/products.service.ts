import { Injectable } from '@angular/core';
import { Product } from '../Products/products';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from '../Services/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import * as Rx from 'rxjs'


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductsService {
  private productsUrl = 'http://94.23.179.229:3030/product';


  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

createProductListFromCodeList(codesList:String[]): Observable<Product[]>{
  return Rx.Observable.from(codesList).concatMap(
    (element) => {
      return this.getProduct(String(element))
   }).combineAll()
  
}
   
  getProduct(id: string): Observable<Product> {
    const url = `${this.productsUrl}/?is=${id}`;
    return this.http.get<Product>(`${this.productsUrl}?code=${id}`).pipe(
      tap(_ => this.log(`fetched  productID=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  searchProducts(term: string): Observable<Product[]> {
    const productsUrl = `${this.productsUrl}/?is=${term}`;
    if (!term.trim()) {
      // if not search term, return empty market array.
      return of([]);
    }
    return this.http.get<Product[]>(`${this.productsUrl}?code=${term}`).pipe(
      tap(_ => this.log(`found products matching "${term} "`)),
      catchError(this.handleError<Product[]>('searchProducts', []))
    );
  
  
  }
  

  private log(message: string) {
    this.messageService.add('ProductService: ' + message);
  }
}
