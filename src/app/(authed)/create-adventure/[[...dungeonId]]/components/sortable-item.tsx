import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDelete, MdDragIndicator, MdEdit } from "react-icons/md";

import { IChampion, ILocation } from "@/types/dungeon";

interface ISortableItemProps {
  i: number;
  item: ILocation | IChampion;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const SortableItem = ({ i, item, onEdit, onDelete }: ISortableItemProps) => {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id: JSON.stringify(item),
  });

  const style = {
    opacity: isDragging ? 0.5 : undefined,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="flex w-full flex-row items-center gap-4 bg-white/5 px-4 py-2 lg:py-4"
      ref={setNodeRef}
      style={style}
    >
      <p className="w-[90%] truncate text-lg font-medium tracking-widest lg:w-full lg:text-2xl">
        {i + 1}. {item.name}
      </p>

      <MdDragIndicator
        className="h-6 w-6 cursor-pointer text-white/75 transition-colors duration-300 hover:text-info lg:h-8 lg:w-8"
        {...attributes}
        {...listeners}
      />

      <MdEdit
        className="h-6 w-6 cursor-pointer text-white/75 transition-colors duration-300 hover:text-warning lg:h-8 lg:w-8"
        onClick={() => onEdit(i)}
      />

      <MdDelete
        className="h-6 w-6 cursor-pointer text-white/75 transition-colors duration-300 hover:text-error lg:h-8 lg:w-8"
        onClick={() => onDelete(i)}
      />
    </div>
  );
};

export default SortableItem;
