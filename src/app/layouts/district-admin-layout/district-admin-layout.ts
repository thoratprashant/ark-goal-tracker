import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {MatBadgeModule} from '@angular/material/badge';
import { CommonService } from '../../core/helper/common.service';

@Component({
  selector: 'app-district-admin-layout',
  standalone: true,
  imports: [CommonModule,RouterOutlet,MatIconModule, MatButtonModule, MatBadgeModule,RouterModule],
  templateUrl: './district-admin-layout.html',
  styleUrl: './district-admin-layout.scss',
})
export class DistrictAdminLayout {
  
  constructor(private commonService: CommonService,private router: Router,) {}
  
  mobileMenuOpen = signal(false);

  toggleMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.mobileMenuOpen.set(false);
  }
}
