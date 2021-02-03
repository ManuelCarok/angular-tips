import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UsersService } from '@core/services/users.service';
import * as Sentry from '@sentry/angular';
import { Observable } from 'rxjs';

export const FORM_PARAMS = {
  ctrlName: 'ctrlName',
  ctrlLastName: 'ctrlLastName'
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public formHome: FormGroup;
  public users: Observable<User[]>;
  public usersNormal: User[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.formHome = this.buildForm();

    // this.users = this.usersService.getUsers();

    // this.usersService.getUsers().subscribe(usersResponse => {
    //   this.usersNormal = usersResponse.map(x => x);
    // });
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      [FORM_PARAMS.ctrlName]: [{value: '', disabled: true}, [Validators.required]],
      [FORM_PARAMS.ctrlLastName]: ['', [Validators.required]]
    });
  }

  setError(): void {

    this.formHome.get(FORM_PARAMS.ctrlName).value;
    Sentry.captureException('Mi Error 2');
  }

  runUsers(): void {
    this.router.navigate(['/users'], { state: this.formHome.getRawValue() });
  }
}
