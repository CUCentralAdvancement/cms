import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { getSession } from 'next-auth/client';
import AdminLayout from '../../../components/layout/AdminLayout';
import ImageInput from '../../../components/forms/ImageInput';
import { useForm } from 'react-hook-form';
import { CreateSpaceInputs } from '../../../data/types';
import { loadCloudinary } from '../../../utils/cloudinary';
interface CreateSpaceFormProps {
  admin: boolean;
}

const CreateSpaceForm: React.FC<CreateSpaceFormProps> = ({ admin }) => {
  const [spImage, setSpImage] = useState(null);
  const { handleSubmit, register } = useForm<CreateSpaceInputs>();
  const onSubmit = (data: CreateSpaceInputs) => {
    console.log(data);
    data.spaceImage = spImage;
    createSpace(data);
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
          <h1 className="my-3" data-testid="create-space-heading">
            Create A Space
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label htmlFor="spaceLabel">Space Label</label>
                <input name="spaceLabel" ref={register} spellCheck size={80} />
              </div>
              <div>
                <label htmlFor="spaceKey">Space Key</label>
                <input name="spaceKey" ref={register} spellCheck size={80} />
              </div>
              <div>
                <label htmlFor="spaceColor">Space Background Color</label>
                <input type="color" name="spaceColor" ref={register} />
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
                <input type="checkbox" name="spaceActive" ref={register} />
              </div>
              <div>
                <label htmlFor="spaceMembers">Members</label>
                <textarea
                  cols={69}
                  rows={3}
                  name="spaceMembers"
                  defaultValue="alex.finnarn@gmail.com"
                  ref={register}
                ></textarea>
              </div>
              <button data-testid="create-space-button" type="submit">
                Create
              </button>
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
): Promise<GetServerSidePropsResult<CreateSpaceFormProps>> => {
  const adminEmails: string = process.env.ADMIN_EMAILS;
  const session = await getSession(context);

  // User needs to have their email listed as an admin.
  if (!adminEmails.includes(session?.user?.email)) {
    context.res.writeHead(302, {
      Location: '/',
    });
    context.res.end();
    return { props: { admin: false } };
  }
  return { props: { admin: true } };
};

async function createSpace(data: CreateSpaceInputs): Promise<void> {
  try {
    const result = await fetch(`http://localhost:3000/api/space`, {
      method: 'POST',
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
