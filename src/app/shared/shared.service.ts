import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  constructor() { }

  _isLoading: boolean;

  isLoading() {
    return this._isLoading;
  }

  showLoading() {
    this._isLoading = true;
  }

  hideLoading() {
    this._isLoading = false;
  }
}
