import { Component, Input } from '@angular/core';
import { AlertService } from './alert.service';
import { Alert, AlertType } from './alert';

@Component({
    selector: 'ap-alert',
    templateUrl: './alert.component.html'
})
export class AlertComponent {

    @Input() timeout = 3000;
    alerts: Alert[] = [];
    iconeMensagem: string;
    currentStyles = {     
        'color':      'red',     
        'font-size':   '22px'
    };
    constructor(private AlertService: AlertService) {
        this.AlertService
        .getAlert()
        .subscribe(alert => {
            if(!alert) {
                this.alerts = [];
                return;
            }
            this.alerts.push(alert);
            setTimeout(() => this.removeAlert(alert), this.timeout);
        })
    }
    removeAlert(alertToRemove: Alert) {
        this.alerts = this.alerts.filter(alert => alert != alertToRemove)
    }

    getAlertClass(alert:Alert) {
        if(!alert) return '';
        switch (alert.alertType) {
            case AlertType.DANGER:
                this.iconeMensagem = 'fa fa-exclamation-circle fa-2x';
                this.currentStyles.color = 'red';
                return 'alert alert-danger';
            case AlertType.INFO:
                this.iconeMensagem = 'fa fa-info-circle fa-2x';
                this.currentStyles.color = 'blue';
                return 'alert alert-primary';
            case AlertType.SUCCESS:
                this.iconeMensagem = 'fa fa-check-circle fa-2x';
                this.currentStyles.color = 'green';
                return 'alert alert-success';
            case AlertType.WARNING:
                this.iconeMensagem = 'fa fa-warning fa-2x';
                this.currentStyles.color = 'orange';
                return 'alert alert-warning'
        }
    }
}