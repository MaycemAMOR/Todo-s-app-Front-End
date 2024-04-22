import {inject} from '@angular/core';
import {CanActivateFn, Router} from "@angular/router";
import {HardcodedAuthenticationService} from "./hardcoded-authentication.service";

export const RouteGuardService: CanActivateFn = (route) => {
  console.log(route);
  if (inject(HardcodedAuthenticationService).isUserLoggedIn())
    return true;

  inject(Router).navigate(['/login']).then(() => false);
  return false;
}
