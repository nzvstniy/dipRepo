import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { AuthenticationService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any;
  password : any;
  errorMessage = 'Данные введены неверно';
  successMessage: any;
  invalidLogin = false;
  loginSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {   }

  ngOnInit() {
  }

  handleLogin() {
    this.authenticationService.authenticationService(this.username, this.password).subscribe((result)=> {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Вы вошли успешно' ;
      this.router.navigate(['/home']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }

}
