import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router'
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';

//Solucion aqui poner: "noImplicitAny": false en tsconfig e instalar npm install -g tslint

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  routerRedirect = '';

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
  }
  onLogin(form: { value: any; }): void {
    this.usuariosService.login(form.value).subscribe(res => {
      //console.log(res);
      if (res.success) {
        // this.router.navigateByUrl('/');
        this.routerRedirect = this.usuariosService.urlUsuarioIntentaAcceder
        this.usuariosService.urlUsuarioIntentaAcceder = '';
        this.router.navigate([this.routerRedirect]);
      }
      if (!res.success) {
        if (res.message == "Password no coincide")
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Contraseña incorrecta!',
            confirmButtonColor: '#A1260C',
          })
        if (res.message == "Usuario no encontrado")
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario no encontrado',
            confirmButtonColor: '#A1260C',
          })
      }
    });
  }
}