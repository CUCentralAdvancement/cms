import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Router from 'next/router';
import { getSession } from 'next-auth/client';
import { Box, Heading, Flex, Grid, Button } from '@cu-advancement/component-library';
import { Label } from 'theme-ui';
import AdminLayout from '../../../components/global/AdminLayout';
import { useForm } from 'react-hook-form';
import { CreateSpaceInputs } from '../../../data/types';

interface CreateSpaceFormProps {
  admin: boolean;
}

const CreateSpaceForm: React.FC<CreateSpaceFormProps> = ({ admin }) => {
  // const [message, setMessage] = useState(null);
  const { handleSubmit, register } = useForm<CreateSpaceInputs>();
  const onSubmit = (data: CreateSpaceInputs) => {
    console.log(data);
    createSpace(data);
    // setMessage(`Space created: \n\n ${JSON.stringify(data)}`);
  };

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
              Create A Space
            </Heading>
            {/* <img src={user.image} alt="profile pic" /> */}
          </Flex>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid gap={3}>
              <Box>
                <Label htmlFor="spaceLabel">Space Label</Label>
                <input name="spaceLabel" ref={register} spellCheck size={80} />
              </Box>
              <Box>
                <Label htmlFor="spaceKey">Space Key</Label>
                <input name="spaceKey" ref={register} spellCheck size={80} />
              </Box>
              <Box>
                <Label htmlFor="spaceColor">Space Background Color</Label>
                <input type="color" name="spaceColor" ref={register} />
              </Box>
              <Box>
                <Label htmlFor="spaceImage">Space Image</Label>
                <input name="spaceImage" ref={register} spellCheck size={80} />
              </Box>
              <Box>
                <Label htmlFor="spaceActive">Is Space Active?</Label>
                <input type="checkbox" name="spaceActive" ref={register} />
              </Box>
              <Box>
                <Label htmlFor="spaceMembers">Members</Label>
                <textarea
                  cols={69}
                  rows={3}
                  name="spaceMembers"
                  defaultValue="alex.finnarn@gmail.com"
                  ref={register}
                ></textarea>
              </Box>
              <Button type="submit">Submit</Button>
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
