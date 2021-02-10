import { GetServerSidePropsResult } from 'next';
import { useMemo } from 'react';
import prisma from '../../../../prisma/prisma';
import AdminLayout from '../../../../components/layout/AdminLayout';
import Heading from '../../../../components/global/Heading';
import ContentListingTable from '../../../../components/tables/ContentEditListingTable';
import { defaultColumns } from '../../../../data/tables/contentListing';
import { FundEditContentSelect } from '../../../../data/types';

interface ContentOverviewProps {
  content: Array<FundEditContentSelect>;
}

const ContentOverview: React.FC<ContentOverviewProps> = ({ content }) => {
  console.log(content);
  const columns = useMemo(() => defaultColumns, []);
  const data = useMemo(() => content, [content]);

  return (
    <>
      <AdminLayout>
        <div className="container mx-auto mt-4 p-3">
          <Heading as="h1">{`Content Overview for the "Fund Admin" space`}</Heading>
          <ContentListingTable
            columns={columns}
            data={data}
            initialState={{
              sortBy: [
                {
                  id: 'updated_at',
                  desc: true,
                },
              ],
            }}
          />
        </div>
      </AdminLayout>
    </>
  );
};

export default ContentOverview;

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<ContentOverviewProps>
> {
  const funds = await prisma.fund.findMany({
    select: {
      id: true,
      allocation_code: true,
      title: true,
      author: {
        select: {
          name: true,
        },
      },
      updated_at: true,
      active: true,
      campus: true,
    },
  });

  const content = [];
  funds.forEach((el) => {
    content.push({
      id: el.id,
      allocation_code: el.allocation_code,
      title: el.title,
      author: el.author.name,
      updated_at: String(el.updated_at),
      active: el.active ? 'Yes' : 'No',
      campus: el.campus,
    });
  });

  return { props: { content } };
}
