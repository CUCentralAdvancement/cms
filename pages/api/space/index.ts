import { NextApiHandler } from 'next';
import prisma from '../../../prisma/prisma';
import { getSession } from 'next-auth/client';
import { CreateSpaceInputs } from '../../../data/types';

// POST /api/space
const handleCreateSpace: NextApiHandler = async (req, res) => {
  const data: CreateSpaceInputs = req.body;
  const adminEmails: string = process.env.ADMIN_EMAILS;
  const session = await getSession({ req });

  // User needs to have their email listed as an admin.
  if (!adminEmails.includes(session?.user?.email)) {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Unauthorized Access' }));
  }

  // @todo Add check for "req.method === POST".
  // This could handle listing for GET and creation for POST.

  try {
    const result = await prisma.space.create({
      data: {
        label: data.spaceLabel,
        key: data.spaceKey,
        active: data.spaceActive,
        image: {
          create: {
            file_name: data.spaceImage.file_name,
            public_id: data.spaceImage.public_id,
            asset_id: data.spaceImage.asset_id,
            resource_type: data.spaceImage.resource_type,
            src: data.spaceImage.src,
            thumbnail: data.spaceImage.thumbnail,
            format: data.spaceImage.format,
            height: data.spaceImage.height,
            width: data.spaceImage.width,
          },
        },
        members: data.spaceMembers,
        // content: content,
        // author: { connect: { email: session?.user?.email } },
      },
    });
    res.json(result);
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error }));
  }
};

export default handleCreateSpace;
