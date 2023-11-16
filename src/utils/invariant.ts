export default function invariant(
  cond?: boolean,
  message?: string,
  ...args: string[]
): asserts cond {
  if (cond) {
    return;
  }

  throw new Error(
    "Internal Lexical Error: invariant() is mean to be replaced at comile " +
      "time. There is no runtime version. Error: " +
      message
  );
}
