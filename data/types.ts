export const defaultUser: UserSelect = {
  id: 99,
  name: 'John Doe',
  image:
    'http://www.messagescollection.com/wp-content/uploads/2015/04/cute-cat-profile-for-facebook.jpg',
  email: 'j@doe.com',
};

export interface UserSelect {
  id: number;
  name: string | null;
  email: string | null;
  image: string | null;
}

export interface Link {
  href: string;
  label: string;
}

export interface CreateSpaceInputs {
  spaceLabel: string;
  spaceKey: string;
  spaceColor?: string;
  spaceImage: string;
  spaceActive: boolean;
  spaceMembers: string;
}

export interface Space {
  id: number;
  label: string;
  key: string;
  color?: string;
  image?: string;
  active: boolean;
  members: string;
}
