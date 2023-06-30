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
      className="w-full bg-white/5 flex flex-row items-center p-4 gap-4"
      ref={setNodeRef}
      style={style}
    >
      <p className="w-full text-2xl font-medium tracking-widest">
        {i + 1}. {item.name}
      </p>

      <MdDragIndicator
        className="text-white/75 cursor-pointer hover:text-info transition-colors duration-300"
        size={32}
        {...attributes}
        {...listeners}
      />

      <MdEdit
        className="text-white/75 cursor-pointer hover:text-warning transition-colors duration-300"
        size={32}
        onClick={() => onEdit(i)}
      />

      <MdDelete
        className="text-white/75 cursor-pointer hover:text-error transition-colors duration-300"
        size={32}
        onClick={() => onDelete(i)}
      />
    </div>
  );
};

export default SortableItem;
