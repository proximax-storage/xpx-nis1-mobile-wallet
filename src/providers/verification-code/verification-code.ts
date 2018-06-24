import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Device } from '@ionic-native/device';

/*
  Generated class for the VerificationCodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VerificationCodeProvider {
  url: string = 'https://nemwalletpro.herokuapp.com';
  headers: Headers;

  constructor(public http: Http, public device: Device) {
    console.log('Hello VerificationCodeProvider Provider');

    this.headers = new Headers({
      'Content-Type': 'charset=utf-8'
    });
  }

  getUrl(path: string) {
    const URL = `${this.url}/${path}`;
    return URL;
  }

  generateToken(email: string) {
    const PAYLOAD = {
      to: email,
      device_id: this.device.uuid,
      otp_type: 'email'
    };

    return this.http
      .post(this.getUrl('token/generate'), PAYLOAD, { headers: this.headers });
  }

  verify(verificationCode) {
    const PAYLOAD = {
      device_id: this.device.uuid,
      otp_code: verificationCode
    };

    return this.http
      .post(this.getUrl('token/verify'), PAYLOAD, { headers: this.headers });
  }
}
