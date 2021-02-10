interface HeadingProps {
  as: 'h1' | 'h2';
}

const Heading: React.FC<HeadingProps> = ({ as, children }) => {
  {
    switch (as) {
      case 'h1':
        return <h1 className="text-3xl my-4">{children}</h1>;
      case 'h2':
        return <h2 className="text-2xl my-3">{children}</h2>;
      default:
        break;
    }
  }
};

export default Heading;
