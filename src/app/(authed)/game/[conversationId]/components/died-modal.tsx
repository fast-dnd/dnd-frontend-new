import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";

const DiedModal = ({ open, close }: { open: boolean; close: () => void }) => {
  return (
    <Modal
      open={open}
      onClose={close}
      className="mx-8 flex h-fit w-fit flex-col items-center gap-8 bg-black/90 px-6 py-8 text-lg shadow-xl shadow-white/10 lg:px-12 lg:text-xl"
    >
      <p className="text-center font-medium uppercase leading-7 tracking-[3.3px]">You are dead</p>
      <p className="text-center leading-7 tracking-[2.64px] text-white/60">
        You have tried with all your might, but you have been defeated.
      </p>
      <Button className="whitespace-nowrap px-8 py-3 uppercase" onClick={close}>
        spectate
      </Button>
    </Modal>
  );
};

export default DiedModal;
