import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Session } from 'src/app/models/session';
import { RequestResult } from 'src/app/models/request-result';
import { ConfigService } from './config.service';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class SSBService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    // private sharedService: SharedService
  ) { }

  validateToken(token: string) {
    return this.http.get<RequestResult<Session>>(`${this.configService.config.urlSSBApi}/Session/ValidateToken?token=${token}`);
  }
}
