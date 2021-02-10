import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import { Post, Fund, Image } from '@prisma/client';
import Link from 'next/link';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import prisma from '../../../../../prisma/prisma';
import { loadCloudinary } from '../../../../../utils/cloudinary';
import AdminLayout from '../../../../../components/layout/AdminLayout';
import Container from '../../../../../components/layout/Container';
import FormGrid from '../../../../../components/forms/FormGrid';
import ContentNavigation from '../../../../../components/spaces/ContentNavigation';
import TextInput from '../../../../../components/forms/TextInput';
import ImageInput from '../../../../../components/forms/ImageInput';
import Checkbox from '../../../../../components/forms/Checkbox';
import Heading from '../../../../../components/global/Heading';
import { Image as ImageType } from '../../../../../data/types';

interface PostWithImage {
  post: Post & { main_image: Image };
}

interface EditContentProps {
  content: Fund & PostWithImage;
  slug: string;
}

const EditContent: React.FC<EditContentProps> = ({ content, slug }) => {
  const [mainImage, setMainImage] = useState<ImageType>(content.post.main_image);
  const { handleSubmit, register } = useForm<PostWithImage>();
  const onSubmit = (data) => {
    console.log(data);
    const fundInputs: Post & { main_image: Image } = data;
    fundInputs.id = content.post.id;
    fundInputs.main_image = mainImage;
    updateContent(fundInputs);
  };
  console.log(content);

  useEffect(() => {
    loadCloudinary();
  }, []);

  return (
    <AdminLayout>
      <Container>
        <ContentNavigation slug={slug} currentAction="content" />
        <Heading as="h1">{`Editing "${content.title}" Content`}</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGrid>
            <TextInput value={content.post.title} name="title" label="Title" register={register} />
            <TextInput
              value={content.post.subtitle}
              name="subtitle"
              label="Subtitle"
              register={register}
            />
            <TextInput value={content.post.slug} name="slug" label="Slug" register={register} />

            <ImageInput
              setImage={setMainImage}
              register={register}
              image={mainImage}
              name="main_image"
              label="Main Image"
            />

            <Checkbox
              value={content.post.published}
              name="published"
              label="Published"
              register={register}
            />
            <Operations content={content} />
          </FormGrid>
        </form>
      </Container>
    </AdminLayout>
  );
};

export default EditContent;

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<EditContentProps>> {
  const id = Number(context.params.slug);
  const slug = String(context.params.slug);

  const content = await prisma.fund.findUnique({
    where: { id: id },
    include: { post: { include: { main_image: true } } },
  });

  return { props: { content, slug } };
}

async function updateContent(data: Post & { main_image: Image }): Promise<void> {
  try {
    // @todo Switch this to be relative or take into account the baseURL.
    const result = await fetch(`http://localhost:3000/api/content/post/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const post = await result.json();
    console.log(post);
    await Router.push('/spaces/fund_admin/content');
  } catch (error) {
    console.error(error);
  }
}

interface OperationsProps {
  content: PostWithImage;
}

const Operations: React.FC<OperationsProps> = ({ content }) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <button className="p-3 bg-blue-600 rounded shadow text-white" type="submit">
        Update
      </button>
      <Link
        as={`/spaces/fund_admin/content/${content.post.id}/delete`}
        href="/spaces/fund_admin/content/[slug]/delete"
      >
        <a>
          <button
            className="p-3 bg-red-600 rounded shadow text-white"
            data-testid="delete-space-button"
          >
            Delete
          </button>
        </a>
      </Link>
    </div>
  );
};
