import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { User, UsersService } from '@core/services/users.service';
import { Observable, } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  user$: Observable<User>;
  user: User;
  public currentNavigation: Navigation;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) {
    // history.state
    this.currentNavigation = this.router.getCurrentNavigation();
  }

  ngOnInit(): void {
    this.reload();
    console.log('extras: ', this.currentNavigation.extras.state);
  }

  reload(): void {
    //  this.route.paramMap.subscribe(paramMap => {
    //   const id = paramMap.get('id');
    //   console.log(id);
    //   otro subscribe
    //   this.usersService.getUserById(id).subscribe(...)
    // });

    this.route.paramMap.pipe(
      switchMap(paramMap => {
        return this.usersService.getUserById(paramMap.get('id'))
      }),
    ).subscribe(user => {
      this.user = user;
    }, err => console.log(err));

    this.user$ = this.route.paramMap
                  .pipe(
                    switchMap(paramMap => this.usersService.getUserById(paramMap.get('id')))
                  );
  }

}
