import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let x = sessionStorage.getItem('sid');
    if (x === 'akshay') {
      this.router.navigate(['login']);
    }
  }
  getData() {
    this.router.navigate(['login']);
  }

  homeProcess() {
    let x = sessionStorage.getItem('sid');
    if (x !== "akshay") {
      this.router.navigate(['home']);
    }
    else {
      this.router.navigate(['login']);
    }
  }
  logoutProcess() {
    this.router.navigate(['login']);
    sessionStorage.setItem('sid', 'akshay');

  }
  saveProcess() {

  }
}
