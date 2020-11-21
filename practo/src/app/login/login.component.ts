import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public uiInvalidCredential = false;

  public fbFormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern("[^ @]*@[^ @]*")]],
    password: ['', [Validators.required,
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]

  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    sessionStorage.setItem('sid', 'akshay');
  }

  async loginProcess() {

    const data = this.fbFormGroup.value;
    const email = this.fbFormGroup.value.email;
    const url = 'http://localhost:4100/auth-user';
    const result: any = await this.http.post(url, data).toPromise();
    console.log(result);

    if (result.orp === true) {
      sessionStorage.setItem('sid', email);
      let x = sessionStorage.getItem('sid');
      if (x !== 'akshay') {
        this.router.navigate(['home']);
      }
    }
    else if (result.orp === false) {
      window.alert("Invalid Login Credential");
      this.uiInvalidCredential = true;
    }


  }
}
