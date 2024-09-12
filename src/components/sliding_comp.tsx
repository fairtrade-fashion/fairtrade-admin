import React from "react";

type slidingProps = {
  children: React.ReactNode;
};

export default function SlidingComp({ children }: slidingProps) {
  return <div>{children}</div>;
}
