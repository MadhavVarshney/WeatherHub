import { LoadingScreenService } from './../../Service/loading-screen.service';
import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from "rxjs";
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit, OnDestroy  {

  loading: any = false;
  loadingSubscription: Subscription;

  constructor(private loadingScreenService: LoadingScreenService) { }

  ngOnInit(): void {
    this.loadingSubscription = this.loadingScreenService.loadingStatus.pipe(
      debounceTime(200)
    ).subscribe(
      value => {
        this.loading = value;
      }
    );
  }

  ngOnDestroy(){
    this.loadingSubscription.unsubscribe();
  }
}
