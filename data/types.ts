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
  spaceImage: Image;
  spaceActive: boolean;
  spaceMembers: string;
}

export interface Space {
  id: number;
  label: string;
  key: string;
  color?: string;
  image?: Image;
  active: boolean;
  members: string;
}

interface Image {
  file_name: string;
  public_id: string;
  asset_id: string;
  resource_type: string;
  src: string;
  thumbnail: string;
  format: string;
  height: number;
  width: number;
}

export const defaultSpace: Space = {
  id: 1,
  label: 'Example',
  key: 'example',
  color: '#000',
  image: {
    file_name: '',
    public_id: '',
    asset_id: '',
    resource_type: '',
    src: '',
    thumbnail: '',
    format: '',
    height: 1,
    width: 1,
  },
  active: true,
  members: 'alex.finnarn@gmail.com,john@doe.com',
};
