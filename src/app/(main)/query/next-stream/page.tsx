import { Suspense } from "react";
import { MyComponent } from "./_components/my-component";

const ExamplePage = () => {
  return (
    <>
      <Suspense fallback={<div>waiting 100.....</div>}>
        <MyComponent wait={100} />
      </Suspense>
    </>
  );
};

export default ExamplePage;
