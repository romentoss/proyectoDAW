import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  constructor(private router: Router) { }
  @Input() public hideLoginButton: boolean = false;
  public isLogged!: boolean;
  ngOnInit(): void {
    
  }
  public goToLogin() {
    this.router.navigate(['/login'])
  }
  public goToHome() {
    this.router.navigate(['/'])
  }
 
}

