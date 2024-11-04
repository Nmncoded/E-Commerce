"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import Modal from "../ui/modal";

export const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal();

  return (
    <Modal
      title="Create Store"
      description="Create a new store"
      isOpen={isOpen}
      onClose={onClose}
    >
      Future create store form
    </Modal>
  );
};
