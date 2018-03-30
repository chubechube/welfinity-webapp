import { Injectable } from '@angular/core';
import { Market } from '../markets/market';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from '../Services/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MarketService {
  private marketsUrl = 'http://94.23.179.229:3030/markets';


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

  getMarkets(): Observable<Market[]> {
    this.messageService.add('MarketService: fetched markets');
    return this.http.get<Market[]>(this.marketsUrl).pipe(
      tap(markets => this.log(`fetched ALL markets`)),
      catchError(this.handleError('getMarkets', []))
    );
  }

 
  getMarket(name: string): Observable<Market> {
    const url = `${this.marketsUrl}/?name=${name}`;
    return this.http.get<Market>(url).pipe(
      tap(_ => this.log(`fetched  single market name=${name}`)),
      catchError(this.handleError<Market>(`getMarket name=${name}`))
    );
  }



/** PUT: update the Market on the server */
updateMarket (market: Market): Observable<any> {
  return this.http.put(this.marketsUrl, market, httpOptions).pipe(
    tap(_ => this.log(`updated market id=${market.id}`)),
    catchError(this.handleError<any>('updateMarket'))
  );
}

/** POST: add a new Market to the server */
addMarket (market: Market): Observable<Market> {
  return this.http.post<Market>(this.marketsUrl, market, httpOptions).pipe(
    // tslint:disable-next-line:no-shadowed-variable
    tap((market: Market) => this.log(`added market w/ id=${market.id}`)),
    catchError(this.handleError<Market>('addMarket'))
  );
}


/** DELETE: delete the market from the server */
deleteMarket (market_name : string): Observable<Market> {
  const url = `${this.marketsUrl}/?name=${market_name}`;
  this.log("MARKET SERVICE "+url);
  return this.http.delete<Market>(url).pipe(
    tap(_ => this.log(`deleted market id`)),
    catchError(this.handleError<Market>('deleteMarket'))
  );
}

/* GET markets whose name contains search term */
searchMarkets(term: string): Observable<Market[]> {
  if (!term.trim()) {
    // if not search term, return empty market array.
    return of([]);
  }
  return this.http.get<Market[]>(`${this.marketsUrl}?name=${term}`).pipe(
    tap(_ => this.log(`found markets matching the word"${term}"`)),
    catchError(this.handleError<Market[]>('searchMarkets', []))
  );


}

  private log(message: string) {
    this.messageService.add('MarketService: ' + message);
  }
}
