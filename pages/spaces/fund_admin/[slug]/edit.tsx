import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import prisma from '../../../../prisma/prisma';
import AdminLayout from '../../../../components/global/AdminLayout';

interface ContentItem {
  title: string;
  id: number;
}
interface EditContentProps {
  content: Array<ContentItem>;
  slug: string;
}

const EditContent: React.FC<EditContentProps> = ({ content, slug }) => {
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
              <li className="py-3 px-9 mr-1 bg-white rounded-t-lg from-purple-400 via-pink-500 to-red-500 bg-gradient-to-b transform hover:scale-105">
                Edit
              </li>
              <li className="py-3 px-9 bg-white rounded-t-lg text-gray-500 bg-gray-200 transform hover:scale-105">
                <Link href="./layout" as={`/spaces/fund_admin/${slug}/layout`}>
                  <a>Layout</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default EditContent;

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<EditContentProps>> {
  const content = await prisma.post.findMany({});
  const slug = String(context.params.slug);
  return { props: { content, slug } };
}
