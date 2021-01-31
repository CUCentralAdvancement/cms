import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
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
  console.log({ ir20 });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
