import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDelete, MdDragIndicator, MdEdit } from "react-icons/md";

interface ISortableItemProps {
  i: number;
  item: { name: string };
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
      className="w-full bg-white/5 flex flex-row items-center px-4 py-2 md:py-4 gap-4"
      ref={setNodeRef}
      style={style}
    >
      <p className="w-44 md:w-full text-lg md:text-2xl font-medium tracking-widest truncate">
        {i + 1}. {item.name}
      </p>

      <MdDragIndicator
        className="w-6 h-6 md:h-8 md:w-8 text-white/75 cursor-pointer hover:text-info transition-colors duration-300"
        {...attributes}
        {...listeners}
      />

      <MdEdit
        className="w-6 h-6 md:h-8 md:w-8 text-white/75 cursor-pointer hover:text-warning transition-colors duration-300"
        onClick={() => onEdit(i)}
      />

      <MdDelete
        className="w-6 h-6 md:h-8 md:w-8 text-white/75 cursor-pointer hover:text-error transition-colors duration-300"
        onClick={() => onDelete(i)}
      />
    </div>
  );
};

export default SortableItem;
