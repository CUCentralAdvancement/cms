import { NextApiHandler } from 'next';
import prisma from '../../../../prisma/prisma';
// import { getSession } from 'next-auth/client';
import { Image, Post } from '@prisma/client';

// POST /api/content/post
const handleUpdatePost: NextApiHandler = async (req, res) => {
  const fundId = req.query.id;
  const data: Post & { main_image: Image } = req.body;

  // const session = await getSession({ req });

  console.log(data);
  if (req.method === 'PUT') {
    const fund = await prisma.post.update({
      where: { id: Number(data.id) },
      data: {
        title: data.title,
        subtitle: data.subtitle,
        slug: data.slug,
        published: data.published,
        updated_at: new Date(),
        main_image: {
          connectOrCreate: {
            where: {
              asset_id: data.main_image.asset_id,
            },
            create: {
              file_name: data.main_image.file_name,
              public_id: data.main_image.public_id,
              asset_id: data.main_image.asset_id,
              resource_type: data.main_image.resource_type,
              src: data.main_image.src,
              thumbnail: data.main_image.thumbnail,
              format: data.main_image.format,
              height: data.main_image.height,
              width: data.main_image.width,
            },
          },
        },
      },
    });
    res.json(fund);
  } else if (req.method === 'DELETE') {
    const fund = await prisma.fund.delete({
      where: { id: Number(fundId) },
    });
    res.json(fund);
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
};

export default handleUpdatePost;
