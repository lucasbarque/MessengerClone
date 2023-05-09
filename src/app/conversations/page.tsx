"use client";

import useConversation from "@/hooks/useConversation";
import { EmptyState } from "@/components/EmptyState";
import clsx from "clsx";

export default function Conversation() {
  const { isOpen } = useConversation();

  return (
    <div
      className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
}
