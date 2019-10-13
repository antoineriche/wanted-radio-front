import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotifierService } from 'src/app/services/notifier.service';
import { Alert, AlertType } from 'src/app/model/alert';

const NOTIFICATION_DURATION = 3000;
@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styles: [  "src/styles.css" ]
})
export class NotifierComponent implements OnInit, OnDestroy {
  
  @Input() id: string;

  alerts: Alert[] = [];
  subscription: Subscription;

  constructor(private notifierService: NotifierService) { }

  ngOnInit() {
    console.log('onInit');
    this.subscription = this.notifierService.onAlert(this.id)
            .subscribe(
              alert => {
                if (!alert.message) {
                    this.alerts = [];
                    return;
                } else {
                  this.alerts.push(alert);
                  setTimeout(() => {
                    this.alerts = this.alerts.filter(obj => obj !== alert);
                  }, NOTIFICATION_DURATION);  
                }           
            });
  }

  ngOnDestroy(): void {
    console.log('hola');
    this.subscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssClass(alert: Alert) {
    if (!alert) {
        return;
    }

    // return css class based on alert type
    switch (alert.type) {
        case AlertType.Success:
            return 'alert alert-success';
        case AlertType.Error:
            return 'alert alert-danger';
        case AlertType.Info:
            return 'alert alert-info';
        case AlertType.Warning:
            return 'alert alert-warning';
    }
  }

}
