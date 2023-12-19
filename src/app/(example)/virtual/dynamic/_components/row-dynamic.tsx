"use client";

import { useRef } from "react";
import { faker } from "@faker-js/faker";
import { useVirtualizer, useWindowVirtualizer } from "@tanstack/react-virtual";
import { Button } from "@/components/ui/button";

const sentences = new Array(10000).fill(true).map(() =>
  faker.lorem.sentence({
    min: 20,
    max: 70,
  })
);

export const RowVirtualDynamic = () => {
  const parentRef = useRef<HTMLDivElement>(null);

  const count = sentences.length;
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
  });

  const items = virtualizer.getVirtualItems();

  return (
    <>
      <div>
        <div className="flex gap-1 mb-1">
          <Button
            variant="outline"
            onClick={() => virtualizer.scrollToIndex(0)}
          >
            Scroll to the top
          </Button>
          <Button
            variant="outline"
            onClick={() => virtualizer.scrollToIndex(count / 2)}
          >
            Scroll to the middle
          </Button>
          <Button
            variant="outline"
            onClick={() => virtualizer.scrollToIndex(count - 1)}
          >
            Scroll to the end
          </Button>
        </div>
        <hr />
        <div ref={parentRef}></div>
      </div>
    </>
  );
};
