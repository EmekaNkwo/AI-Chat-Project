import { Modal } from "antd";
import React from "react";

const CommandModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Modal
      title="Vertically centered modal dialog"
      centered
      styles={{
        content: {
          backgroundColor: "#121212",
        },
      }}
      open={isModalOpen}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
    >
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>
  );
};

export default CommandModal;
