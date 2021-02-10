import Link from 'next/link';

interface ContentNavigationProps {
  currentAction: string;
  slug: string;
}

const actions = ['view', 'edit', 'content', 'layout'];

const ContentNavigation: React.FC<ContentNavigationProps> = ({ currentAction, slug }) => {
  return (
    <div style={{ borderBottom: '2px solid #eaeaea' }}>
      <ul className="flex cursor-pointer">
        {actions.map((action, index) => {
          const styles =
            action === currentAction
              ? 'from-purple-400 via-pink-500 to-red-500 bg-gradient-to-b'
              : 'text-gray-500 bg-gray-200 border';
          return (
            <Link
              key={index}
              href={`./${action}`}
              as={`/spaces/fund_admin/content/${slug}/${action}`}
            >
              <a>
                <li
                  className={`py-3 px-9 mr-1 last:mr-0 rounded-t-lg transform hover:scale-105 ${styles}`}
                >
                  {action}
                </li>
              </a>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default ContentNavigation;
