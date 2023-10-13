import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const UserButtonSkeleton = (props: Props) => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-[34px] w-[34px] rounded-full" />
    </div>
  );
};

export default UserButtonSkeleton;
