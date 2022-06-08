import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Router } from 'express';
import { Observable } from 'rxjs';

import { UsuariosService } from './usuarios/services/usuarios.service';
// import { EmpleadosService } from './empleados/services/empleado.service';

@Injectable({
  providedIn: 'root'
})

export class CanActivateGuard implements CanActivate {

  constructor(private router: Router, private usuariosService: UsuariosService) {
    //aqui agregar al constructor empleadosService: EmpleadosService

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.usuariosService.isLoggedIn(state.url)) {
    // if (this.usuariosService.isLoggedIn(state.url) || (this.empleadosService.isLoggedIn(state.url))) {
      return true;
    }
    this.router.navigate(['login'])
    return false;
  }
}
