import { Injectable } from '@angular/core';

export class GlobalErrorHandler {
  constructor(public originalError?: any) {}
}

export class Unauthorize {
  constructor(public originalError?: any) {}
}

export class BadRequest {
  constructor(public originalError?: any) {}
}

export class Forbidden {
  constructor(public originalError?: any) {}
}
