import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { HttpServiceService } from "./http-service.service";

@Injectable()
export class AuthServiceService implements CanActivate {

  constructor(private http: HttpServiceService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.http.LoginRequired) {
        this.router.navigate(['login']);
        return false;
    } else {
      return true;
    }
  }
}
