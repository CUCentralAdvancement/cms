import { NextApiHandler } from 'next';
import prisma from '../../prisma/prisma';
// import { getSession } from 'next-auth/client';
// import { CreateSpaceInputs } from '../../../data/types';

// POST /api/seed
const seedData: NextApiHandler = async (req, res) => {
  if (!req.query.key || req.query.key !== process.env.DEV_KEY) {
    res.json('No seed for you!');
    return;
  }

  const seededUsers = await prisma.user.createMany({
    skipDuplicates: true,
    data: [
      { name: 'alex.finnarn', email: 'alex.finnarn@gmail.com' },
      { name: 'John Doe', email: 'john@doe.com' },
    ],
  });

  const seededSpace = await prisma.space.upsert({
    where: { key: 'fund_admin' },
    update: {},
    create: {
      label: 'Fund Admin',
      key: 'fund_admin',
      color: '#000000',
      image: {
        create: {
          file_name: 'funds',
          public_id: 'funds_fzzg1d',
          asset_id: '1f9941136c8a4303ec607e8366da7baf',
          resource_type: 'image',
          src: 'https://res.cloudinary.com/hxbi3szrj/image/upload/v1612929853/funds_fzzg1d.webp',
          thumbnail:
            'https://res.cloudinary.com/hxbi3szrj/image/upload/c_limit,h_60,w_90/v1612929853/funds_fzzg1d.jpg',
          format: 'webp',
          height: 486,
          width: 728,
        },
      },
      active: true,
      members: 'alex.finnarn@gmail.com,john@doe.com',
    },
  });

  const seededFund = await prisma.fund.upsert({
    where: { allocation_code: '0430106' },
    update: {},
    create: {
      allocation_code: '0430106',
      title: 'Bridge Forward Scholarship Endowment',
      description:
        'To provide scholarship awards at the University of Colorado Colorado Springs for undergraduate students with an Expected Family Contribution up to 250% above Pell Grant eligibility or similar financial need program.',
      featured_fund: true,
      priority_fund: false,
      active: true,
      keywords: 'Office of Financial Aid',
      interest: 'Scholarships & Student Success',
      fund_type: 'Endowed Funds',
      campus: 'UCCS',
      default_amount: 32,
      author: {
        connectOrCreate: {
          where: {
            email: 'alex.finnarn@gmail.com',
          },
          create: {
            email: 'alex.finnarn@gmail.com',
            name: 'alex.finnarn',
          },
        },
      },
      post: {
        connectOrCreate: {
          where: {
            slug: 'bridge-forward-scholarship-endowment',
          },
          create: {
            title: 'Bridge Forward Scholarship Endowment',
            type: 'Fund',
            subtitle: 'Bridging the gap to success in the west!',
            slug: 'bridge-forward-scholarship-endowment',
            published: true,
            author: {
              connectOrCreate: {
                where: {
                  email: 'alex.finnarn@gmail.com',
                },
                create: {
                  email: 'alex.finnarn@gmail.com',
                  name: 'alex.finnarn',
                },
              },
            },
            main_image: {
              create: {
                file_name: 'bridge',
                public_id: 'bridge_hfmwpw',
                asset_id: '2f49a46bf0124e3646ea9ebf0eac3e7f',
                resource_type: 'image',
                src:
                  'https://res.cloudinary.com/hxbi3szrj/image/upload/v1612931883/bridge_hfmwpw.jpg',
                thumbnail:
                  'https://res.cloudinary.com/hxbi3szrj/image/upload/c_limit,h_60,w_90/v1612931883/bridge_hfmwpw.jpg',
                format: 'jpg',
                height: 900,
                width: 1200,
              },
            },
          },
        },
      },
    },
  });

  res.json({ seededSpace, seededUsers, seededFund });
};

export default seedData;
