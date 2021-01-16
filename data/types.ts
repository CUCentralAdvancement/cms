export interface User {
  name?: string;
  email?: string;
  image?: string;
}

export const defaultUser: User = {
  name: 'John Doe',
  image:
    'http://www.messagescollection.com/wp-content/uploads/2015/04/cute-cat-profile-for-facebook.jpg',
  email: 'j@doe.com',
};

export interface Link {
  href: string;
  label: string;
}
