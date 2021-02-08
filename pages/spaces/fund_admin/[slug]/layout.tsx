import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import prisma from '../../../../prisma/prisma';
import AdminLayout from '../../../../components/global/AdminLayout';
import { useState } from 'react';

interface ContentItem {
  title: string;
  id: number;
}
interface ContentOverviewProps {
  content: Array<ContentItem>;
  slug: string;
}

const ContentOverview: React.FC<ContentOverviewProps> = ({ content, slug }) => {
  const [addContent, setAddContent] = useState(false);
  console.log(content);
  return (
    <>
      <AdminLayout>
        <div className="container mx-auto p-4">
          <div style={{ borderBottom: '2px solid #eaeaea' }}>
            <ul className="flex cursor-pointer">
              <li className="py-3 px-9 mr-1 bg-white rounded-t-lg text-gray-500 bg-gray-200 border transform hover:scale-105">
                View
              </li>
              <li className="py-3 px-9 mr-1 bg-white rounded-t-lg text-gray-500 bg-gray-200 border transform hover:scale-105">
                <Link href="./edit" as={`/spaces/fund_admin/${slug}/edit`}>
                  <a>Edit</a>
                </Link>
              </li>
              <li className="py-3 px-9 rounded-t-lg border from-purple-400 via-pink-500 to-red-500 bg-gradient-to-b transform hover:scale-105">
                Layout
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center justify-between p-3  ">
            <p className="p-4 my-3 border-gray-300 border rounded lg:min-w-full">Some stuff</p>
            {addContent && (
              <p className="p-4 border-gray-300 border rounded lg:min-w-full flex flex-row justify-between">
                <span>Add some stuff</span>
                <button
                  onClick={() => setAddContent(false)}
                  className="p-3 ml-2 bg-black text-white rounded"
                >
                  X
                </button>
              </p>
            )}
            <span
              onClick={() => setAddContent(true)}
              className={
                'w-14 h-14 text-xl rounded-full p-3 m-3 bg-gray-300 text-center align-middle cursor-pointer' +
                ' transform hover:bg-blue-300 hover:shadow hover:text-white hover:pointer hover:scale-110'
              }
            >
              +
            </span>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default ContentOverview;

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ContentOverviewProps>> {
  const content = await prisma.post.findMany({});
  const slug = String(context.params.slug);
  return { props: { content, slug } };
}
