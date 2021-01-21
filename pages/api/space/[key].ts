import { NextApiHandler } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/client';
import { CreateSpaceInputs } from '../../../data/types';

// POST /api/space
const handleUpdateSpace: NextApiHandler = async (req, res) => {
  const spackeKey = req.query.key;
  const data: CreateSpaceInputs = req.body;
  const adminEmails: string = process.env.ADMIN_EMAILS;
  const session = await getSession({ req });

  // User needs to have their email listed as an admin.
  if (!adminEmails.includes(session?.user?.email)) {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Unauthorized Access' }));
  }

  if (req.method === 'PUT') {
    const space = await prisma.space.update({
      where: { key: String(spackeKey) },
      data: {
        key: data.spaceKey,
        label: data.spaceLabel,
        // @todo Add color to the Space model.
        // color: data.spaceColor,
        image: data.spaceImage,
        active: data.spaceActive,
        members: data.spaceMembers,
      },
    });
    res.json(space);
  } else if (req.method === 'DELETE') {
    const space = await prisma.space.delete({
      where: { key: String(spackeKey) },
    });
    res.json(space);
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
};

export default handleUpdateSpace;
