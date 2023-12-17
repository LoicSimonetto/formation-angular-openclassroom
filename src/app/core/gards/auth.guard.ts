import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthServiceService } from "../services/auth.service.service";

@Injectable({
   providedIn: 'root' 
})
export class AuthGuard implements CanActivate {

constructor(private auth: AuthServiceService,
            private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.auth.getToken()){
            return true;
        }
        else{
            this.router.navigateByUrl('/auth/login');
            return false;
        }
    } 
}
