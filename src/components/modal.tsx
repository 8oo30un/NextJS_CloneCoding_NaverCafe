// components/Modal.tsx
import React from "react";

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const modal = ({ visible, onClose, children }: ModalProps) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-[400px] max-w-full shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="모달 닫기 버튼"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default modal;
