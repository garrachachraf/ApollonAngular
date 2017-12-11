export class Pricing {
  hourly: number;
  daily: number;
  monthly: number;
  weekly: number;
  minimumBooking: number;
  securityDeposit: number;
  cleaningFee: number;

  constructor(  hourly: number, daily: number, monthly: number, weekly: number, minimumBooking: number, securityDeposit: number, cleaningFee: number ) {
  this.hourly  = hourly;
  this.daily = daily;
  this.monthly = monthly;
  this.weekly = weekly;
  this.minimumBooking = minimumBooking;
  this.securityDeposit = securityDeposit;
  this.cleaningFee = cleaningFee;
  }
}
