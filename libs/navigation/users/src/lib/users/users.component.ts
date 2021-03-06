import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';
import { UsersState } from '@nx-mean-starter/state/users';
import { InfiniteScrollEvent } from 'ngx-infinite-scroll';
import { combineLatest, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  done$: Observable<boolean>;
  loading$: Observable<boolean>;

  constructor(private store: Store<UsersState.State>) {}

  ngOnInit() {
    this.users$ = this.store.select(UsersState.getPaginationUsers);
    this.done$ = this.store.select(UsersState.getPaginationDone);
    this.loading$ = this.store.select(UsersState.getLoading);
    this.store.dispatch(new UsersState.LoadBatch({ limit: 20 }));
  }

  nextBatch(current: InfiniteScrollEvent, skip: number) {
    combineLatest(this.done$, this.loading$)
      .pipe(
        take(1),
        filter(([done, loading]) => !done && !loading),
      )
      .subscribe(() => {
        this.store.dispatch(new UsersState.LoadBatch({ limit: 20, skip }));
      });
  }

  trackByIdx(i) {
    return i;
  }
}
