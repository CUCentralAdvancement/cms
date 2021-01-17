import { NextApiHandler } from 'next';
import prisma from '../../../lib/prisma';
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

  try {
    const result = await prisma.space.create({
      data: {
        label: data.spaceLabel,
        key: data.spaceKey,
        active: data.spaceActive,
        image: data.spaceImage,
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
