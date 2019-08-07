export interface Bid {
  id?: number;
  buyerId: number;
  sellerId: number;
  details: object;
  status: string;
  totalBid: number;
  contactName?: string;
  pDateTime?: string;
  createdAt?: string;
  updatedAt?: string;
  seller?: Object;
  buyer?: Object;
}

export interface SellerItem {
  id: number;
  sellerId: number;
  details: object;
  createdAt: string;
  updatedAt: string;
}

export interface Buyer {
  id: number;
  name: string;
  userId: number;
  city: string;
  pinCode: number;
  persona: string;
  address: string;
  mobNo: string;
  altMobNo: string;
  lat: number;
  long: number;
  createdAt: string;
  updatedAt: string;
  approved: boolean;
}

export const BUYER_DATA: Buyer[] = [
  {
    id: 3,
    name: 'Green enterprises',
    userId: 1,
    city: 'Chennai',
    pinCode: 600092,
    persona: 'Seller',
    address: 'Plot no 139',
    mobNo: '9286784035',
    altMobNo: '976234511',
    lat: 18.92,
    long: 20.96,
    createdAt: '2019-07-08T05:43:41.347Z',
    updatedAt: '2019-07-08T05:43:41.347Z',
    approved: true
  }
];

export interface Seller {
  id: number;
  userId?: number;
  name: string;
  lat: number;
  long: number;
}

export const SELLER_DATA: Seller[] = [
  {
    id: 1,
    name: 'Resource Recovery Centre 002',
    lat: 12.9652163,
    long: 80.1902814
  },
  {
    id: 2,
    name: 'Seller 2',
    lat: 12.952377,
    long: 80.186376
  },
  {
    id: 3,
    name: 'Seller 3',
    lat: 12.963962,
    long: 80.204229
  },
  {
    id: 4,
    name: 'Seller 4',
    lat: 12.961652,
    long: 80.239031
  },
  {
    id: 5,
    name: 'Seller 5',
    lat: 12.940156,
    long: 80.237498
  },
  {
    id: 6,
    name: 'Seller 6',
    lat: 12.990103,
    long: 80.218733
  },
  {
    id: 7,
    name: 'Seller 7',
    lat: 12.993266,
    long: 80.253921
  }
];

export const MATERIALS = {
  plastic_waste: 'Plastic Waste',
  hdpe: 'HDPE',
  pet: 'PET Waste',
  rubber: 'Rubber'
};
