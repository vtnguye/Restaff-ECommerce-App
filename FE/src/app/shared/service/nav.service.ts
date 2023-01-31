import { Injectable, HostListener, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WINDOW } from './windows.service';
// Menu
export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: 'root',
})
export class NavService {
  public screenWidth: any;
  public collapseSidebar: boolean = false;

  constructor(@Inject(WINDOW) private window) {
    this.onResize();
    if (this.screenWidth < 991) {
      this.collapseSidebar = true;
    }
  }

  // Windows width
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  MENUITEMS: Menu[] = [
    {
      title: 'Page',
      icon: 'clipboard',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/blogs/list-blogs',
          title: 'Blog List',
          type: 'link',
        },
        {
          path: '/page-content/list-page-content',
          title: 'Page Content',
          type: 'link',
        },
      ],
    },
    {
      title: 'Product',
      icon: 'package',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/products/list-products',
          title: 'Products',
          type: 'link',
        },
        {
          path: '/orders/list-orders',
          title: 'Orders',
          type: 'link',
        },
        {
          path: '/categories/list-categories',
          title: 'Category',
          type: 'link',
        },
        {
          path: '/coupons/list-coupons',
          title: 'Coupon',
          type: 'link',
        },
      ],
    },
    {
      title: 'Admins & Customers',
      icon: 'users',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/users/list-users',
          title: 'Admins',
          type: 'link',
        },
        {
          path: '/customers/list-customers',
          title: 'Customers ',
          type: 'link',
        },
        {
          path: '/contact/list-contact',
          title: 'Contact',
          type: 'link',
        },
      ],
    },
    {
      title: 'Settings',
      icon: 'settings',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/banners/list-banners',
          title: 'Banners',
          type: 'link',
        },
        {
          path: '/social-medias/list-social-medias',
          title: 'Social Media',
          type: 'link',
        },
        {
          path: '/information-website/list-information-website',
          title: 'Website Information',
          type: 'link',
        },
      ],
    },
  ];

  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
