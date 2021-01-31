import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import prisma from '../../../../prisma/prisma';
import { getSession, Session } from 'next-auth/client';
import { Box, Heading, Flex, Grid, Button, Label, Text } from 'theme-ui';
import AdminLayout from '../../../../components/global/AdminLayout';
import { useForm } from 'react-hook-form';
import { CreateSpaceInputs, Space, defaultSpace } from '../../../../data/types';
interface EditSpaceFormProps {
  admin: boolean;
  space: Space;
}

const CreateSpaceForm: React.FC<EditSpaceFormProps> = ({ admin, space }) => {
  const [spaceImage, setSpaceImage] = useState(space.image);
  const { handleSubmit, register } = useForm<CreateSpaceInputs>();
  const onSubmit = (data: CreateSpaceInputs) => {
    console.log(data);
    data.spaceImage = spaceImage;
    updateSpace(data);
  };

  function openCloudinary(e) {
    e.preventDefault();
    const myWidget = cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
        uploadPreset: 'doody_burgers',
        cropping: true,
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info);
          setSpaceImage({
            file_name: String(result.original_filename),
            public_id: String(result.public_id),
            asset_id: String(result.asset_id),
            resource_type: String(result.resource_type),
            src: String(result.secure_url),
            thumbnail: String(result.thumbnail_url),
            format: String(result.format),
            height: Number(result.height),
            width: Number(result.width),
          });
          myWidget.close();
        }
      }
    );
    myWidget.open();
  }

  useEffect(() => {
    loadCloudinary();
  }, []);

  if (!admin) {
    console.log('need to do something');
  }

  return (
    <>
      <AdminLayout>
        <Box sx={{ maxWidth: '600px', mx: 'auto', mt: 4, p: 3 }}>
          {/* {message && <Message>{message}</Message>} */}
          <Flex
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Heading sx={{ my: 3 }} as="h1">
              {`Edit ${space.label} Space`}
            </Heading>
            {/* <img src={user.image} alt="profile pic" /> */}
          </Flex>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid gap={3}>
              <Box>
                <Label htmlFor="spaceLabel">Space Label</Label>
                <input
                  defaultValue={space.label}
                  name="spaceLabel"
                  ref={register}
                  spellCheck
                  size={80}
                />
              </Box>
              <Box>
                <Label htmlFor="spaceKey">Space Key</Label>
                <Text sx={{ p: 1, color: 'darkred' }}>
                  **You cannot edit the key after creating the space.
                </Text>
                <input
                  defaultValue={space.key}
                  readOnly
                  name="spaceKey"
                  ref={register}
                  spellCheck
                  size={80}
                />
              </Box>
              <Box>
                <Label htmlFor="spaceColor">Space Background Color</Label>
                <input defaultValue={space.color} type="color" name="spaceColor" ref={register} />
              </Box>
              <Box>
                <Flex
                  sx={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid #ccc',
                    p: 3,
                  }}
                >
                  <Box>
                    <Label htmlFor="spaceImage">Space Image</Label>
                    <input
                      defaultValue={spaceImage.src}
                      name="spaceImage"
                      ref={register}
                      spellCheck
                      size={50}
                    />
                  </Box>
                  <Box>
                    <Button
                      id="upload_widget"
                      className="cloudinary-button"
                      onClick={(e) => openCloudinary(e)}
                    >
                      Upload file?
                    </Button>
                  </Box>
                </Flex>
              </Box>
              <Box>
                <Label htmlFor="spaceActive">Is Space Active?</Label>
                <input
                  defaultChecked={space.active}
                  type="checkbox"
                  name="spaceActive"
                  ref={register}
                />
              </Box>
              <Box>
                <Label htmlFor="spaceMembers">Members</Label>
                <textarea
                  cols={69}
                  rows={3}
                  name="spaceMembers"
                  defaultValue={space.members}
                  ref={register}
                ></textarea>
              </Box>
              <Flex
                sx={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Button type="submit">Update</Button>
                <Link as={`/admin/spaces/${space.key}/delete`} href="/admin/spaces/[space]/delete">
                  <a>
                    <Button variant="button.secondary" data-testid="delete-space-button">
                      Delete
                    </Button>
                  </a>
                </Link>
              </Flex>
            </Grid>
          </form>
        </Box>
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

function loadCloudinary() {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
  const body = document.getElementsByTagName('body')[0];
  body.appendChild(script);
}
