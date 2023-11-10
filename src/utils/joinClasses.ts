/*
className 에 조건을 붙이기 위해 사용하는 Util
하지만 tailwind를 사용하기 때문에 불필요
*/
export default function joinClasses(
  ...args: Array<string | boolean | null | undefined>
) {
  return args.filter(Boolean).join(" ");
}
