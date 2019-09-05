import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-sidebar]',
  templateUrl: './app-sidebar.component.html'
})
export class AppSidebar implements OnInit {

  usuario = {
    nome: 'App Tecnologia',
    fotoURL: './assets/img/admin-avatar.png',
    grupo: { descricao: 'Administrador' }
  };
  ngOnInit() {
  }
}
