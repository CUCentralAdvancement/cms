import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import prisma from '../../../../prisma/prisma';
import { getSession, Session } from 'next-auth/client';
import AdminLayout from '../../../../components/global/AdminLayout';
import ImageInput from '../../../../components/forms/ImageInput';
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
          <div className="flex justify-between items-center">
            <h1 className="my-3">{`Edit ${space.label} Space`}</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="mr-2" htmlFor="spaceLabel">
                  Space Label
                </label>
                <input
                  defaultValue={space.label}
                  name="spaceLabel"
                  className="focus:ring-2 focus:ring-blue-600"
                  ref={register}
                  spellCheck
                  size={80}
                />
              </div>
              <div>
                <label htmlFor="spaceKey">Space Key</label>
                <span className="p-2 text-red-700">
                  **You cannot edit the key after creating the space.
                </span>
                <input
                  defaultValue={space.key}
                  readOnly
                  name="spaceKey"
                  className="focus:ring-2 focus:ring-blue-600"
                  ref={register}
                  spellCheck
                  size={80}
                />
              </div>
              <div>
                <label htmlFor="spaceColor">Space Background Color</label>
                <input defaultValue={space.color} type="color" name="spaceColor" ref={register} />
              </div>
              <div>
                <ImageInput
                  setImage={setSpImage}
                  register={register}
                  image={spImage}
                  name="spaceImage"
                />
              </div>
              <div>
                <label htmlFor="spaceActive">Is Space Active?</label>
                <input
                  defaultChecked={space.active}
                  type="checkbox"
                  className="p-2 checked:bg-blue-600 checked:border-transparent"
                  name="spaceActive"
                  ref={register}
                />
              </div>
              <div>
                <label htmlFor="spaceMembers">Members</label>
                <textarea
                  cols={69}
                  rows={3}
                  name="spaceMembers"
                  className="focus:ring-2 focus:ring-blue-600"
                  defaultValue={space.members}
                  ref={register}
                ></textarea>
              </div>
              <div className="flex flex-row justify-between items-center">
                <button className="p-3 bg-blue-600 rounded shadow text-white" type="submit">
                  Update
                </button>
                <Link as={`/admin/spaces/${space.key}/delete`} href="/admin/spaces/[space]/delete">
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
