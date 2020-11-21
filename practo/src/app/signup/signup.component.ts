import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  public uiInvalidCredential = false;

  public fbFormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
    email: ['', [Validators.required, Validators.email, Validators.pattern("[^ @]*@[^ @]*")]],
    mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("[0-9]*")]],
    password: ['', [Validators.required,
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]

  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) { }



  ngOnInit(): void {
    sessionStorage.setItem('sid', 'akshay');
  }

  async signupProcess() {

    const data = this.fbFormGroup.value;
    const url = 'http://localhost:4100/reg';

    const result: any = await this.http.post(url, data).toPromise();
    if (result.orp) {

      this.router.navigate(['login']);
    }
    else {
      this.uiInvalidCredential = true;
    }

  }

}
