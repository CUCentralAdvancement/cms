import { NextApiHandler } from 'next';
import prisma from '../../../../prisma/prisma';
// import { getSession } from 'next-auth/client';
import { EditFundsInputs } from '../../../../data/types';

// POST /api/content/fund
const handleUpdateFund: NextApiHandler = async (req, res) => {
  const fundId = req.query.id;
  const data: EditFundsInputs = req.body;

  // const session = await getSession({ req });

  console.log(data);
  if (req.method === 'PUT') {
    const fund = await prisma.fund.update({
      where: { id: Number(data.id) },
      data: { ...data, updated_at: new Date() },
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

export default handleUpdateFund;
