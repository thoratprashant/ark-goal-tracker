import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

interface Role {
  name: string;
  users: number;
}

interface PermissionItem {
  permissionName: string;
  enabled: boolean;
}

interface PermissionGroup {
  title: string;
  permissions: PermissionItem[];
}


@Component({
  selector: 'app-permission-management',
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink, MatSlideToggleModule],
  templateUrl: './permission-management.html',
  styleUrl: './permission-management.scss',
})

export class PermissionManagement {
  showRolesSideover = false;
  selectedIndex = 0;
  isToggled = true;

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

  permissions: PermissionGroup[] = [
    {
      title: 'General',
      permissions: [
        { permissionName: 'View Dashboard', enabled: true },
        { permissionName: 'Export Data', enabled: false }
      ]
    },
    {
      title: 'Administration',
      permissions: [
        { permissionName: 'Manage Users', enabled: false },
        { permissionName: 'View Reports', enabled: true }
      ]
    },
    {
      title: 'Data Management',
      permissions: [
        { permissionName: 'Import Data', enabled: false },
        { permissionName: 'Export Data', enabled: true }
      ]
    },
    {
      title: 'Goal Management',
      permissions: [
        { permissionName: 'Goal Sets', enabled: false },
        { permissionName: 'Goal Views', enabled: true }
      ]
    },
    {
      title: 'Reporting',
      permissions: [
        { permissionName: 'Report Views', enabled: false },
        { permissionName: 'Report Creates', enabled: true }
      ]
    },
    {
      title: 'System',
      permissions: [
        { permissionName: 'System Settings', enabled: false }
      ]
    },
    {
      title: 'Student Data',
      permissions: [
        { permissionName: 'View Student Data', enabled: true },
        { permissionName: 'Edit Student Data', enabled: false }
      ]
    }
  ];

  onToggleChange(title: string, permissionName: string, checked: boolean): void {
    const group = this.permissions.find(g => g.title === title);
    if (group) {
      const item = group.permissions.find(p => p.permissionName === permissionName);
      if (item) {
        item.enabled = checked;
      }
    }
  }
}
