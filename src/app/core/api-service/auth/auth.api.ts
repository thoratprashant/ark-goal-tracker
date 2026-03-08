import { Injectable } from "@angular/core";
import { ApiService } from "../api.service";

@Injectable({ providedIn: 'root' })
export class AuthApi {

  constructor(private api: ApiService) {}

  // login view otp - send otp
  loginOtp(username: string) {
    return this.api.post<{ success: boolean; message: string; data: any }>('/auth/login-otp', { username });
  }

  // verify otp
  verifyOtp(otp: string, sessionId: string) {
    return this.api.post<{ success: boolean; message: string; data: any }>('/auth/verify-otp', { otp, sessionId });
  }

  // login via password
  loginPassword(username: string, password: string) {
    return this.api.post<{ success: boolean; message: string; data: any }>('/auth/login-password', { username, password });
  }

  // check identity or user
  identify(username: string) {
    return this.api.post<{ success: boolean; message: string; data: any }>('/auth/identify', { username });
  }
  
}
