import { Menu } from './sidenav-menu';

export const MENUMASTER: Menu[] = [
  {
    id: 1,
    link: '',
    name: 'Home',
    parentId: 0,
    icon: 'home'
  },
  {
    id: 13,
    link: 'admin/buyer-list',
    name: 'Buyer',
    parentId: 0,
    icon: 'nature_people',
    authorizedPersona: ['admin']
  },
  {
    id: 14,
    link: 'admin/seller-list',
    name: 'Seller',
    parentId: 0,
    icon: 'delete_sweep',
    authorizedPersona: ['admin']
  },
  {
    id: 2,
    link: '',
    name: 'About us',
    parentId: 0,
    icon: 'info',
    children: [
      {
        id: 7,
        link: 'info/our-team',
        name: 'Our team',
        parentId: 2,
        icon: 'people'
      },
      {
        id: 8,
        link: 'info/special-thanks',
        name: 'Special thanks',
        parentId: 2,
        icon: 'tag_faces'
      },
      {
        id: 9,
        link: 'info/idea',
        name: 'Our idea',
        parentId: 2,
        icon: 'movie_filter'
      },
      {
        id: 10,
        link: 'info/advisory-team',
        name: 'Advisory team',
        parentId: 2,
        icon: 'folder_special'
      },
      {
        id: 11,
        link: '',
        name: 'Resource partners',
        parentId: 2,
        icon: 'folder_shared'
      },
      {
        id: 12,
        link: '',
        name: 'Social mandate',
        parentId: 2,
        icon: 'share'
      }
    ]
  },
  {
    id: 3,
    link: '',
    name: 'How it works',
    parentId: 0,
    icon: 'help'
  },
  {
    id: 4,
    link: '',
    name: 'Acts and rules',
    parentId: 0,
    icon: 'flare'
  },
  {
    id: 5,
    link: '',
    name: 'Media',
    parentId: 0,
    icon: 'photo_album'
  },
  {
    id: 6,
    link: 'info/contact-us',
    name: 'Contact us',
    parentId: 0,
    icon: 'forum'
  },
  {
    id: 7,
    link: 'info/offers',
    name: 'Offers',
    parentId: 0,
    icon: 'local_play'
  },
  {
    id: 8,
    link: 'info/terms-and-conditions',
    name: 'Terms and Conditions',
    parentId: 0,
    icon: 'deck'
  },
  {
    id: 9,
    link: 'info/privacy-policy',
    name: 'Privacy Policy',
    parentId: 0,
    icon: 'security'
  }
];
