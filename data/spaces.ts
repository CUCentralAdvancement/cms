import ContentOverview from '../pages/spaces/[space]/content';

interface App {
  label: string;
  path: string;
  component: React.FC;
}

interface Space {
  label: string;
  key: string;
  active: boolean;
  apps: Array<App>;
}

const ir20: Space = {
  label: 'IR 20',
  key: 'ir20',
  active: true,
  apps: [
    {
      label: 'Content Overview',
      component: ContentOverview,
      path: 'content',
    },
  ],
};

export default {
  ir20,
};
