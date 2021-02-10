import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import { Fund, User } from '@prisma/client';
import Link from 'next/link';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import prisma from '../../../../../prisma/prisma';
import AdminLayout from '../../../../../components/layout/AdminLayout';
import Container from '../../../../../components/layout/Container';
import FormGrid from '../../../../../components/forms/FormGrid';
import TextInput from '../../../../../components/forms/TextInput';
import TextArea from '../../../../../components/forms/TextArea';
import Checkbox from '../../../../../components/forms/Checkbox';
import SelectList from '../../../../../components/forms/SelectList';
import Heading from '../../../../../components/global/Heading';
import ContentNavigation from '../../../../../components/spaces/ContentNavigation';
import { EditFundsInputs } from '../../../../../data/types';

interface EditContentProps {
  content: Fund & { author: User };
  slug: string;
}

const campuses = [
  { label: 'Anschutz', value: 'Anschutz' },
  { label: 'Boulder', value: 'Boulder' },
  { label: 'Denver', value: 'Denver' },
  { label: 'System', value: 'System' },
  { label: 'UCCS', value: 'UCCS' },
];

const EditContent: React.FC<EditContentProps> = ({ content, slug }) => {
  const { handleSubmit, register, watch } = useForm<EditFundsInputs>();
  const onSubmit = (data: EditFundsInputs) => {
    const fundInputs = data;
    fundInputs.id = content.id;
    fundInputs.default_amount = Number(watchDefaultAmount);
    updateContent(fundInputs);
  };

  const watchDefaultAmount = watch('default_amount');

  return (
    <AdminLayout>
      <Container>
        <ContentNavigation slug={slug} currentAction="edit" />
        <div className="flex justify-between items-center">
          <Heading as="h1">{`Editing "${content.title}" Object`}</Heading>
          <span>{`Authored by: ${content.author.name}`}</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGrid>
            <TextInput value={content.title} name="title" label="Title" register={register} />
            <TextArea
              value={content.description}
              name="description"
              label="Description"
              register={register}
            />
            <TextInput
              value={content.allocation_code}
              name="allocation_code"
              label="Allocation Code"
              register={register}
            />
            <Checkbox value={content.active} name="active" label="Active" register={register} />
            <Checkbox
              value={content.featured_fund}
              name="featured_fund"
              label="Featured Fund"
              register={register}
            />
            <Checkbox
              value={content.priority_fund}
              name="priority_fund"
              label="Priority Fund"
              register={register}
            />
            <SelectList
              value={content.campus}
              options={campuses}
              name="campus"
              label="Campus"
              register={register}
            />

            <label className="mr-2" htmlFor="default_amount">
              {`Default Amount: $`}
              <output htmlFor="default_amount">
                {watchDefaultAmount || content.default_amount}
              </output>
            </label>

            {/* <input
              // value={content.default_amount}
              type="number"
              name="default_amount"
              min="1"
              max="100"
              step="1"
              ref={register}
            /> */}
            <input
              type="range"
              name="default_amount"
              min="1"
              max="1000"
              step="1"
              value={content.default_amount}
              ref={register}
            />

            <TextInput
              value={content.fund_type}
              name="fund_type"
              label="Fund Type"
              register={register}
            />
            <TextInput
              value={content.interest}
              name="interest"
              label="Interest"
              register={register}
            />
            <TextInput
              value={content.keywords}
              name="keywords"
              label="Keywords"
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

  const content = await prisma.fund.findUnique({ where: { id: id }, include: { author: true } });

  return { props: { content, slug } };
}

async function updateContent(data: EditFundsInputs): Promise<void> {
  try {
    // @todo Switch this to be relative or take into account the baseURL.
    const result = await fetch(`http://localhost:3000/api/content/fund/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const fund = await result.json();
    console.log(fund);
    await Router.push('/spaces/fund_admin/content');
  } catch (error) {
    console.error(error);
  }
}

interface OperationsProps {
  content: Fund;
}

const Operations: React.FC<OperationsProps> = ({ content }) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <button className="p-3 bg-blue-600 rounded shadow text-white" type="submit">
        Update
      </button>
      <Link
        as={`/spaces/fund_admin/content/${content.id}/delete`}
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
