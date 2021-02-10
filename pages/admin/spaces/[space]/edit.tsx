import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import prisma from '../../../../prisma/prisma';
import { getSession, Session } from 'next-auth/client';
import AdminLayout from '../../../../components/layout/AdminLayout';
import ImageInput from '../../../../components/forms/ImageInput';
import TextInput from '../../../../components/forms/TextInput';
import TextArea from '../../../../components/forms/TextArea';
import Checkbox from '../../../../components/forms/Checkbox';
import { loadCloudinary } from '../../../../utils/cloudinary';
import { useForm } from 'react-hook-form';
import { CreateSpaceInputs, Space, defaultSpace, Image as ImageType } from '../../../../data/types';
interface EditSpaceFormProps {
  admin: boolean;
  space: Space;
}

const CreateSpaceForm: React.FC<EditSpaceFormProps> = ({ admin, space }) => {
  const [spImage, setSpImage] = useState<ImageType>(space.image);
  const { handleSubmit, register } = useForm<CreateSpaceInputs>();
  const onSubmit = (data: CreateSpaceInputs) => {
    console.log(data);
    data.spaceImage = spImage;
    updateSpace(data);
  };

  useEffect(() => {
    loadCloudinary();
  }, []);

  if (!admin) {
    console.log('need to do something');
  }

  return (
    <>
      <AdminLayout>
        <div className="container mx-auto mt-4 p-3">
          <h1 className="my-3 text-2xl">{`Edit ${space.label} Space`}</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-flow-row auto-rows-max gap-3">
              <TextInput
                value={space.label}
                name="spaceLabel"
                label="Space Label"
                register={register}
              />
              <TextInput value={space.key} name="spaceKey" label="Space Key" register={register} />

              <label htmlFor="spaceColor">Space Background Color</label>
              <input defaultValue={space.color} type="color" name="spaceColor" ref={register} />

              <ImageInput
                setImage={setSpImage}
                register={register}
                image={spImage}
                name="spaceImage"
                label="Space Image"
              />

              <Checkbox
                value={space.active}
                name="spaceActive"
                label="Active?"
                register={register}
              />

              <TextArea
                value={space.members}
                name="spaceMembers"
                label="Members"
                register={register}
              />

              <div className="flex flex-row justify-between items-center">
                <button className="p-3 bg-blue-600 rounded shadow text-white" type="submit">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </AdminLayout>
    </>
  );
};

export default CreateSpaceForm;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<EditSpaceFormProps>> => {
  const adminEmails: string = process.env.ADMIN_EMAILS;
  const session: Session = await getSession(context);

  // User needs to have their email listed as an admin.
  if (!adminEmails.includes(session?.user?.email)) {
    context.res.writeHead(302, {
      Location: '/',
    });
    context.res.end();
    return { props: { admin: false, space: defaultSpace } };
  }

  const space: Space = await prisma.space.findUnique({
    where: { key: String(context.params.space) },
    include: { image: true },
  });

  return { props: { admin: true, space } };
};

async function updateSpace(data: CreateSpaceInputs): Promise<void> {
  try {
    // @todo Switch this to be relative or take into account the baseURL.
    const result = await fetch(`http://localhost:3000/api/space/${data.spaceKey}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const space = await result.json();
    console.log(space);
    await Router.push('/admin/spaces');
  } catch (error) {
    console.error(error);
  }
}
