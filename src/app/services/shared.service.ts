import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Company } from '../models/session';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public companyChanged: BehaviorSubject<Company> = new BehaviorSubject<Company>(null);
  public loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public successNotification: BehaviorSubject<{ message: string | string[], showPopUp: boolean }> = new BehaviorSubject<{ message: string | string[], showPopUp: boolean }>(null);
  public errorNotification: BehaviorSubject<{ message: string | string[], showPopUp: boolean }> = new BehaviorSubject<{ message: string | string[], showPopUp: boolean }>(null);
  public warningNotification: BehaviorSubject<{ message: string | string[], showPopUp: boolean }> = new BehaviorSubject<{ message: string | string[], showPopUp: boolean }>(null);
  public infoNotification: BehaviorSubject<{ message: string | string[], showPopUp: boolean }> = new BehaviorSubject<{ message: string | string[], showPopUp: boolean }>(null);

  constructor(private sesionService: SessionService) { }

  showLoader(valor: boolean) {
    return this.loader.next(valor);
  }

  changeCompany(company: Company) {
    this.sesionService.session = { ...this.sesionService.session, selectedCompany: company };
    this.companyChanged.next(company);
  }

  success(message: string | string[], showPopUp: boolean = false) {
    this.successNotification.next({ message, showPopUp });
  }

  error(message: string | string[], showPopUp: boolean = false) {
    this.errorNotification.next({ message, showPopUp });
  }

  warning(message: string | string[], showPopUp: boolean = false) {
    this.warningNotification.next({ message, showPopUp });
  }

  info(message: string | string[], showPopUp: boolean = false) {
    this.infoNotification.next({ message, showPopUp });
  }

  createHttpParams(params: any): HttpParams {
    return Object.getOwnPropertyNames(params)
      .reduce((p, key) => p.set(key, params[key]), new HttpParams());
  }

  popupHeight() {
    return 400; // Math.round(window.innerHeight / 1.3);
  }

  formHeight() {
    return 350; // Math.round(window.innerHeight / 1.3);
  }

  IsNumber(s: string) {
    const x = +s;
    return x.toString() === s;
  }

  insertValueInTextArea(inputId: string, value: string) {
    if (inputId && value) {
      const input: any = document.getElementById(inputId);
      if (input) {
        input.focus();
        const lastPost = input.selectionStart;
        input.value = input.value.slice(0, input.selectionStart) + value + input.value.slice(input.selectionStart);
        input.setSelectionRange(lastPost, (value.length + lastPost), 'forward');
        return input.value;
      }
      return '';
    }
  }
}