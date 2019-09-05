import { Component, AfterViewInit } from '@angular/core';
import { HelperWindow } from '@app/shared/window';

@Component({
  selector: '[app-header]',
  templateUrl: './app-header.component.html',
})
export class AppHeader implements AfterViewInit {

  constructor(
  ) { }

  ngAfterViewInit()  {
	}

  sobe() {
    HelperWindow.MoverParaCima();
   }
}
