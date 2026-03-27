import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CommonService } from '../../core/helper/common.service';

@Component({
  selector: 'app-principal-layout',
  imports: [CommonModule,RouterOutlet,MatIconModule, MatButtonModule, MatBadgeModule,RouterModule],
  templateUrl: './principal-layout.html',
  styleUrl: './principal-layout.scss',
})
export class PrincipalLayout {

  constructor(private commonService: CommonService,private router: Router,) {}
  
  mobileMenuOpen = signal(false);

  toggleMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.mobileMenuOpen.set(false);
  }
}
