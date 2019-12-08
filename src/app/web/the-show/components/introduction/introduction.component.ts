import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShowPartComponent } from 'src/app/web/shared-components/show-part/show-part.component';
import { CountDownService } from 'src/app/services/count-down.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent extends ShowPartComponent implements OnInit, OnDestroy  {
  
  constructor(countDownService: CountDownService) {
    super(countDownService);
  }

  ngOnInit() {
    super.ngOnInit();
    console.log('on init intro');  
  }

  ngOnDestroy(): void {

  }

}
