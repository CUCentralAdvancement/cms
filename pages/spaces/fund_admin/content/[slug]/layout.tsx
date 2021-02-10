import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { Post, Image, Fund } from '@prisma/client';
import prisma from '../../../../../prisma/prisma';
import AdminLayout from '../../../../../components/layout/AdminLayout';
import ContentNavigation from '../../../../../components/spaces/ContentNavigation';
import Heading from '../../../../../components/global/Heading';

interface PostWithImage {
  post: Post & { main_image: Image };
}

interface EditLayoutProps {
  content: Fund & PostWithImage;
  slug: string;
}

const EditLayout: React.FC<EditLayoutProps> = ({ content, slug }) => {
  const [addContent, setAddContent] = useState(false);
  console.log(content);
  return (
    <>
      <AdminLayout>
        <div className="container mx-auto p-4">
          <ContentNavigation slug={slug} currentAction="layout" />
          <Heading as="h1">{`Editing "${content.title}" Layout`}</Heading>
          <div className="flex flex-col items-center justify-between p-3  ">
            <div className="p-4 my-3 border-gray-300 border rounded lg:min-w-full flex flex-row justify-between">
              Some stuff
            </div>
            {addContent && (
              <div className="p-4 border-gray-300 border rounded lg:min-w-full">
                <div className="flex flex-row justify-between p-2 items-baseline">
                  <Heading as="h2">Add Some Components</Heading>
                  <button
                    onClick={() => setAddContent(false)}
                    className="p-3 ml-2 bg-black text-white rounded"
                  >
                    X
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2">
                  <div className="p-2 border rounded shadow">Image</div>
                  <div className="p-2 border rounded shadow">Text</div>
                  <div className="p-2 border rounded shadow">Field</div>
                  <div className="p-2 border rounded shadow">Quote</div>
                </div>
              </div>
            )}
            <button
              onClick={() => setAddContent(true)}
              className={
                'w-14 h-14 text-xl rounded-full p-3 m-3 bg-gray-300 text-center align-middle cursor-pointer' +
                ' transform hover:bg-blue-300 hover:shadow hover:text-white hover:pointer hover:scale-110' +
                ' focus:outline-none'
              }
            >
              +
            </button>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default EditLayout;

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<EditLayoutProps>> {
  const id = Number(context.params.slug);
  const slug = String(context.params.slug);

  const content = await prisma.fund.findUnique({
    where: { id: id },
    include: { post: { include: { main_image: true, content: true } } },
  });

  return { props: { content, slug } };
}
