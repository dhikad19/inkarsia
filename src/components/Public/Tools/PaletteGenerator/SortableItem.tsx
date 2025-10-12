"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem: React.FC<{
  id: string;
  className?: string;
  children: React.ReactElement; // ubah: pastikan children bisa di-clone
}> = ({ id, children, className }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 40 : undefined,
    opacity: isDragging ? 0.7 : 1,
    cursor: "default", // biar seluruh card bukan cursor drag
  };

  return (
    <div ref={setNodeRef} style={style} className={className}>
      {React.cloneElement(children, {
        dragHandleProps: { ...attributes, ...listeners },
      })}
    </div>
  );
};
