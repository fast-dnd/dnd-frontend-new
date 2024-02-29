import { useEffect, useRef } from "react";
import { motion, PanInfo, useMotionValue, useSpring } from "framer-motion";

interface ISwiperProps {
  children: React.ReactNode;
  itemWidth: number;
  arrayLength: number;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const MobileSwiper = ({
  children,
  itemWidth,
  arrayLength,
  currentIndex,
  setCurrentIndex,
}: ISwiperProps) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const offsetX = useMotionValue(-currentIndex * itemWidth);
  const animatedX = useSpring(offsetX, {
    damping: 100,
    stiffness: 1000,
  });

  useEffect(() => {
    offsetX.set(-currentIndex * itemWidth);
  }, [currentIndex, itemWidth, offsetX]);

  const canScrollPrev = currentIndex > 0;
  const canScrollNext = currentIndex < arrayLength - 1;

  const handleDragSnap = (
    _: MouseEvent,
    { offset: { x: dragOffset }, velocity: { x: velocity } }: PanInfo,
  ) => {
    containerRef.current?.removeAttribute("data-dragging");
    animatedX.stop();
    const currentOffset = offsetX.get();
    const velocityDelta = Math.abs(velocity) > itemWidth ? -Math.sign(velocity) : 0;
    const steps = Math.round(-dragOffset / itemWidth);

    if (
      (steps === 0 && velocityDelta === 0) ||
      (!canScrollPrev && dragOffset > 0) ||
      (!canScrollNext && dragOffset < 0)
    ) {
      animatedX.set(currentOffset);
      return;
    }
    const combined = steps !== 0 ? currentIndex + steps : currentIndex + velocityDelta;

    const newIndex = combined < 0 ? 0 : combined > arrayLength - 1 ? arrayLength - 1 : combined;

    setCurrentIndex(newIndex);
  };

  return (
    <motion.div className="size-full">
      <div className="relative h-full">
        <motion.ul
          ref={containerRef}
          className="z-10 flex h-full items-start"
          style={{
            x: animatedX,
          }}
          drag="x"
          dragConstraints={{
            left: -(itemWidth * (arrayLength - 1)),
            right: itemWidth,
          }}
          onDragStart={() => {
            containerRef.current?.setAttribute("data-dragging", "true");
          }}
          onDragEnd={handleDragSnap}
        >
          {children}
        </motion.ul>
      </div>
    </motion.div>
  );
};

export default MobileSwiper;
