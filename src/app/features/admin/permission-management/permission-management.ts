import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

interface Role {
  name: string;
  users: number;
}

@Component({
  selector: 'app-permission-management',
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './permission-management.html',
  styleUrl: './permission-management.scss',
})
export class PermissionManagement {
  showRolesSideover = false;
  selectedIndex = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth >= 769) {
      this.showRolesSideover = false;
    }
  }

  roles: Role[] = [
      { name: 'District Admin', users: 3 },
      { name: 'Principal', users: 18 },
      { name: 'Teacher', users: 18 },
      { name: 'School Admin', users: 18 }
    ];

  selectRole(index: number): void {
    this.selectedIndex = index;
  }
}
