import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from './helpers';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
	selector: 'body',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	encapsulation: ViewEncapsulation.None,
})

export class AppComponent implements OnInit, AfterViewInit {
	title = 'app';
	
	constructor(private _router: Router) {
		setTheme('bs4'); //config ngx-bootstrap 
	 }

	ngOnInit() {
		
		this._router.events.subscribe((route) => {
			if (route instanceof NavigationStart) {
				Helpers.setLoading(true);
				//Helpers.bodyClass('fixed-navbar');
				Helpers.bodyClass('fixed-navbar sidebar-mini');
			}
			if (route instanceof NavigationEnd) {
				window.scrollTo(0, 0);
				Helpers.setLoading(false);

				// Initialize page: handlers ...
				Helpers.initPage();
			}

		});
	}
	ngAfterViewInit() { }
}
