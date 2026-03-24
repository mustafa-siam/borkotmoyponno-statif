interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}
export const categories: Category[] = [
  { id: 1, name: 'মধু', image: '/honeyChak.jpg', slug: 'modhu' },
  { id: 2, name: 'তেল', image: '/product.png', slug: 'toel' },
  { id: 3, name: 'ঘি', image: '/product.png', slug: 'ghee' },
  { id: 4, name: 'খেজুর', image: '/product.png', slug: 'khejur' },
  { id: 5, name: 'মসলা', image: '/product.png', slug: 'mosla' },
  { id: 6, name: 'অন্যান্য', image: '/caregory.png', slug: 'others' },
];
