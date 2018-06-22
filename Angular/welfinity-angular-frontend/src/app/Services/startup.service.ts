import { Injectable } from "@angular/core";

@Injectable()
export class StartupService {

  public message: string;

  constructor() {
  }

  load(): Promise<boolean> {
    console.log("CREATING PROMISE");
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        this.message = "Hello World";
        console.log('hello world');
        resolve(true);
      }, 15000);
    });

  }

}