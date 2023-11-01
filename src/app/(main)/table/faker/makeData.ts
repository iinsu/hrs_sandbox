import { faker } from "@faker-js/faker";

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: "relationship" | "complicated" | "single";
  createdAt: Date;
  subRows?: Person[];
};

const range = (length: number) => {
  const array = [];
  for (let i = 0; i < length; i++) {
    array.push(i);
  }

  return array;
};

const newPerson = (): Person => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    createdAt: faker.date.between({
      from: "2023-01-01T00:00:00.000Z",
      to: "2024-01-01T00:00:00.000Z",
    }),
    status: faker.helpers.shuffle<Person["status"]>([
      "relationship",
      "complicated",
      "single",
    ])[0]!,
  };
};

export function makeData(...lengthList: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const length = lengthList[depth]!;
    return range(length).map((): Person => {
      return {
        ...newPerson(),
        subRows: lengthList[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
