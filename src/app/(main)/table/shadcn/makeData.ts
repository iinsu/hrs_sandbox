import { faker } from "@faker-js/faker";

export type Posts = {
  title: string;
  description: string;
  price: number;
  author: string;
  status: "music" | "photo" | "movie";
  createdAt: Date;
  subRows?: Posts[];
};

const range = (length: number) => {
  const array = [];
  for (let i = 0; i < length; i++) {
    array.push(i);
  }

  return array;
};

const newPerson = (): Posts => {
  return {
    title: faker.string.alpha(40),
    description: faker.lorem.word(100),
    price: faker.number.int(100000),
    author: faker.person.fullName(),
    createdAt: faker.date.between({
      from: "2023-01-01T00:00:00.000Z",
      to: "2024-01-01T00:00:00.000Z",
    }),
    status: faker.helpers.shuffle<Posts["status"]>([
      "music",
      "photo",
      "movie",
    ])[0]!,
  };
};

export function makeData(...lengthList: number[]) {
  const makeDataLevel = (depth = 0): Posts[] => {
    const length = lengthList[depth]!;
    return range(length).map((): Posts => {
      return {
        ...newPerson(),
        subRows: lengthList[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
