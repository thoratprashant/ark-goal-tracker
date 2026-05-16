import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CommonService } from '../../core/helper/common.service';

@Component({
  selector: 'app-teachers-layout',
  imports: [CommonModule,RouterOutlet,MatIconModule, MatButtonModule, MatBadgeModule,RouterModule],
  templateUrl: './teachers-layout.html',
  styleUrl: './teachers-layout.scss',
})
export class TeachersLayout {
  constructor(private commonService: CommonService,private router: Router,) {}
  
  mobileMenuOpen = signal(false);

  toggleMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.mobileMenuOpen.set(false);
  }
}
