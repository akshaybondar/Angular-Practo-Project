import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  public uiInvalidCredential = false;
  public fbFormGroup = this.fb.group({

    email: ['', [Validators.required, Validators.email, Validators.pattern("[^ @]*@[^ @]*")]],
    mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("[0-9]*")]],
    password: ['', [Validators.required,
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]

  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    sessionStorage.setItem('sid', 'akshay');
  }
  async reset() {
    const data = this.fbFormGroup.value;

    const url = 'http://localhost:4100/reset-user';
    const result: any = await this.http.post(url, data).toPromise();

    if (result.orp) {
      alert("Password has been successfully reset");
      this.router.navigate(['login']);

    }
    else {
      alert("Invalid Forget Details");
      this.uiInvalidCredential = true;
      this.router.navigate(['forgetpassword']);

    }
  }

}
