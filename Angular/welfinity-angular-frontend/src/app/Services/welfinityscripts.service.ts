import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../Services/message.service';
import {HttpParams} from "@angular/common/http";

const httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/vnd.ms-excel' })
  };
  
@Injectable()
export class WelfinityscriptsService {
   private WIM_createMarkets_Url = 'http://94.23.179.229:3030/wim';
   private  WDM_Extract_and_Aggregate_Url = 'http://94.23.179.229:3030/wdm';

  
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
  
 
  WIM_createMarkets(): Observable<String> {
    const url = `${this.WIM_createMarkets_Url}`;
    return this.http.get<String>(url).pipe(
      tap(_ => this.log(`Created  market`)),
      catchError(this.handleError<String>(`Create Market`))
    );
  }
   
 

  WDM_Extract_and_Aggregate_Multiple(params: HttpParams): Observable<Blob> {
    
     return this.http.get(this.WDM_Extract_and_Aggregate_Url,{
        responseType: "blob",
        params
      });
  }
 
    private log(message: string) {
      this.messageService.add('WelfinityScriptsService: ' + message);
    }
  }
  
  export interface ProductElement {
    aic: string;
    description: string;
   
  }