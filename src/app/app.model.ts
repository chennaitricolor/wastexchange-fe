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

export const MATERIALS = {
  hdp: 'HDP Waste',
  shreddedPlastic: 'Shredded Plastic',
  coconutShells: 'Coconut Shells',
  cocoPit: 'Coco Pit',
  slippers: 'Slippers',
  foams: 'Foams',
  thermocol: 'Thermocol',
  bags: 'Bags',
  mlp: 'Multi Level Plastic',
  plasticBottles: 'Plastic Bottles',
  glassBottles: 'Glass Bottles',
  clothes: 'Clothes',
  rubber: 'Tyre / Rubber',
  lights: 'Tube / LED Lights',
  compost: 'Compost (Manure)',
  vermiCompost: 'Vermi Compost'
};