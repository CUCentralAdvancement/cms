export interface User {
  name?: string;
  email?: string;
  image?: string;
}

export const defaultUser: User = {
  name: 'John Doe',
  image: '1234',
  email: 'j@doe.com',
};

export interface Link {
  href: string;
  label: string;
}
