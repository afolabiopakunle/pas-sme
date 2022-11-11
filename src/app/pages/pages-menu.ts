import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'grid',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Administration',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
    children: [
      {
        title: 'Roles & Permissions',
        link: '/pages/layout/tabs',
      },
    ],
  },
  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  {
    title: 'Accounting',
    icon: 'layout-outline',
    children: [
      {
        title: 'Income statement',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Balance sheet',
        link: '/pages/layout/list',
      },
      {
        title: 'Cash flow',
        link: '/pages/layout/tabs',
      },
      {
        title: 'General report',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Journal ledger',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs',
      },
      {
        title: 'General ledger',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Trial balance',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Age analysis of debt',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Creditors statement',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Debtors statement',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Settings',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs',
      },
    ],
  },
  {
    title: 'Inventory',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Create inventory',
        link: '/pages/layout/tabs',
      },
      {
        title: 'POS',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Vendors',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Reports',
        link: '/pages/layout/tabs',
      },
    ],
  },
  {
    title: 'Payroll',
    icon: 'keypad-outline',
    link: '/pages/layout/tabs',
    children: [
      {
        title: 'Create employee',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Employee list',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Create loan',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Loan list',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Setup payroll',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Payroll summary',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Report',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Settings',
        link: '/pages/layout/tabs',
      },
    ],
  },
  {
    title: 'Invoicing',
    icon: 'browser-outline',
    children: [
      {
        title: 'Create invoice',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Invoice summary',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Credit summary',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Payment summary',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Tax summary',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Bad debt',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Settings',
        link: '/pages/layout/tabs',
      },
    ],
  },
  {
    title: 'Fixed Asset Management',
    icon: 'message-circle-outline',
    children: [
      {
        title: 'Create asset',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Create vendor',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Checkout',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Asset disposal',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Fixed asset register',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Depreciation schedule',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Equipment based analysis',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Reports',
        link: '/pages/layout/tabs',
      },
    ],
  },
  {
    title: 'Tax management',
    icon: 'map-outline',
    children: [
      {
        title: 'Personal income',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Company income',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Value added',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Capital allowance',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Capital allowance table',
        link: '/pages/layout/tabs',
      },
      {
        title: 'Partnership list',
        link: '/pages/layout/tabs',
      },
    ],
  },
];
