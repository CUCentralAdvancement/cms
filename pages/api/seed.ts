import { NextApiHandler } from 'next';
import prisma from '../../prisma/prisma';
// import { getSession } from 'next-auth/client';
// import { CreateSpaceInputs } from '../../../data/types';

// POST /api/seed
const seedSpace: NextApiHandler = async (req, res) => {
  const ir20 = await prisma.space.upsert({
    where: { key: 'ir20' },
    update: {},
    create: {
      label: 'Example',
      key: 'example',
      color: '#000000',
      image: {
        create: {
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
      },
      active: true,
      members: 'alex.finnarn@gmail.com,john@doe.com',
    },
  });
  res.json(ir20);
};

export default seedSpace;
