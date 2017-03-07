import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  constructor() { }

  public isLoggedIn(): boolean {

      return false; //implement authentication logic

  }

  public isAdmin(): boolean {

      return false; //implement status logic

  }

}
