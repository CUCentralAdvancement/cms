export interface User {
  name?: string;
  picture?: string;
  email?: string;
  sub?: string;
}

export const defaultUser: User = {
  name: 'John Doe',
  picture: '1234',
  email: 'j@doe.com',
  sub: 'N/A',
};

export interface Link {
  href: string;
  label: string;
}
