import { Injectable } from '@angular/core';
import { SESSION_LS_NAME, REG_MED_ID } from 'src/app/models/consts';
import { Session } from 'src/app/models/session';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  get session(): Session {
    const data = localStorage.getItem(SESSION_LS_NAME);
    if (data && data !== '') {
      return JSON.parse(atob(data));
    }
    return null;
  }
  set session(value: Session) {
    if (value) {
      const data = btoa(JSON.stringify(value));
      localStorage.setItem(SESSION_LS_NAME, data);
    }
  }

  get registroMedicoId(): string {
    const data = localStorage.getItem(REG_MED_ID);
    if (data && data !== '') {
      return atob(data)
    }
    return null;
  }

  set registroMedicoId(value: string) {
    if (value) {
      localStorage.setItem(REG_MED_ID, btoa(value));
    }
  }
  HCType: string = null;//Tipo de HC

  constructor() { }

  clean() {
    localStorage.removeItem(SESSION_LS_NAME);
    localStorage.removeItem(REG_MED_ID);
    setTimeout(() => {
      window.parent.postMessage(
        { eventName: 'logout' },
        '*'
      );
    }, 300);
  }
}
