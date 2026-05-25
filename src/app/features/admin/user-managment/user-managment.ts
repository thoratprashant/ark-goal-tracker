import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { CommonService } from '../../../core/helper/common.service';
import AOS from 'aos';

@Component({
  selector: 'app-user-managment',
  imports: [CommonModule,RouterLink,MatIconModule,MatSelectModule,MatFormFieldModule,],
  templateUrl: './user-managment.html',
  styleUrl: './user-managment.scss',
})
export class UserManagment {
  constructor( private commonService: CommonService ) {}

  loadMore(){ 
    this.commonService.showLoader();
    setTimeout(() => {
       this.commonService.hideLoader();
           setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);

  }, 1500);
  }

  users = [
    {
      name: 'Ishita Sharma',
      email: 'ishita@arkenea.com',
      role: 'District Admin',
      icon: 'images/poeple-blue.svg'
    },
    {
      name: 'Rahul Verma',
      email: 'rahul@arkenea.com',
      role: 'System Admin',
      icon: 'images/poeple-blue.svg'
    },
    {
      name: 'Priya Singh',
      email: 'priya@arkenea.com',
      role: 'Principals',
      icon: 'images/poeple-blue.svg'
    },
     {
      name: 'Ram Joshi',
      email: 'ramjoshi@arkenea.com',
      role: 'Teachers',
      icon: 'images/poeple-blue.svg'
    }
  ];

  ngAfterViewInit(): void {
    AOS.init({
      duration: 1000,
      once: true
    }); 
    AOS.refresh();
  }
}
