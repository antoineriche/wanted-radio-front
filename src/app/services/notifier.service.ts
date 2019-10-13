import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Alert, AlertType } from '../model/alert';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
          if (this.keepAfterRouteChange) {
              this.keepAfterRouteChange = false;
          } else {
              this.clear();
          }
      }
    });
  }

  clear(alertId?: string) {
    this.subject.next(new Alert({ alertId }));
  }

  onAlert(alertId?: string): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.alertId === alertId));
  }

  // main alert method    
  alert(alert: Alert) {
    this.keepAfterRouteChange = alert.keepAfterRouteChange;
    this.subject.next(alert);
  }

  showWarning(message: string, alertId?: string){
    this.alert(new Alert({ message, type: AlertType.Warning, alertId }))
  }

  showError(message: string, alertId?: string){
    this.alert(new Alert({ message, type: AlertType.Error, alertId }))
  }

  showSucess(message: string, alertId?: string){
    this.alert(new Alert({ message, type: AlertType.Success, alertId }))
  }

  showInfos(message: string, alertId?: string){
    this.alert(new Alert({ message, type: AlertType.Info, alertId }))
  }

  showAPIError(apiError:any){
    this.showError('Can not get rappers from server: <br/>' + apiError.message);
  }
}
