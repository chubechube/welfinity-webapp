import { Injectable } from '@angular/core';
import { Product } from '../Products/products';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from '../Services/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductsService {
  private productsUrl = 'http://94.23.179.229:3030/markets';


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

   
  getProduct(id: string): Observable<Product> {
    const url = `${this.productsUrl}/?is=${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched  productID=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add('ProductService: ' + message);
  }
}
