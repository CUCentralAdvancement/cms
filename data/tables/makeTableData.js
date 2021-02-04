import faker from 'faker';

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPost = () => {
  // const statusChance = Math.random();
  return {
    title: faker.name.title(),
    type: Math.random() > 0.5 ? 'IR20_Story' : 'Fund',
    author: `${faker.name.firstName()} ${faker.name.lastName()}`,
    published: Math.random() > 0.5 ? 'Yes' : 'No',
    updated_at: String(Math.random() > 0.5 ? faker.date.recent() : faker.date.past()),
    operations: faker.lorem.slug(),
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(() => {
      return {
        ...newPost(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
