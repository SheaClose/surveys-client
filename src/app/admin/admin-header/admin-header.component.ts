import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth-service.service';
import { Router } from '@angular/router';

@Component({
 selector: 'app-admin-header',
 templateUrl: './admin-header.component.html',
 styleUrls: ['./admin-header.component.css'],
 providers: [ AuthService ]
})


export class AdminHeaderComponent implements OnInit {

 constructor(
  private authService: AuthService,
  private router: Router
 ) { }

 adminLogout() {
  this.authService.logout()
   .subscribe( ( response ) => {
    if ( response === 200 ) {
      this.router.navigate( ['/landing'] );
    }
   });
 }

 ngOnInit() {
 }

}
