import Image from "next/image";
import { ReactNode } from "react";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/examples/forms",
  },
  {
    title: "Account",
    href: "/examples/forms/account",
  },
  {
    title: "Appearance",
    href: "/examples/forms/appearance",
  },
  {
    title: "Notifications",
    href: "/examples/forms/notifications",
  },
  {
    title: "Display",
    href: "/examples/forms/display",
  },
];

const FormLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/images/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/images/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5"></aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
};

export default FormLayout;
