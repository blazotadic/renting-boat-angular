import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { UserService } from "src/app/service/user.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError((errorResponse: any) => {
        if (errorResponse.status === 401) {
          this.userService.logout();
          this.router.navigate(['login']);
        }
        return throwError(errorResponse); // throw new Error(errorResponse)
      }));
  }

}
