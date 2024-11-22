import { Modal } from 'antd'
import React from 'react'
import useChatPage from './useChatPage'
import ChatInput from './ChatInput'

const EditMessageModal = ({
    isModalOpen,
    setIsModalOpen
}: {isModalOpen: boolean,setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const {setTextForEdit,textForEdit, handleSubmit } = useChatPage()

    const handleSendEdittedMessage = () => {
        handleSubmit();
        setIsModalOpen(false)
    }

    console.log();
    

  return (
    <Modal centered title=""  keyboard={false} closeIcon={false} okButtonProps={{ style: { display: "none" } }} cancelButtonProps={{ style: { display: "none" } }} closable={false} open={isModalOpen} onOk={() => {}} onCancel={() => {
        setIsModalOpen(false)
    }}>
   <div className="">
    <ChatInput text={textForEdit} setText={setTextForEdit} onSubmit={handleSendEdittedMessage}/>
    <div className="flex justify-end gap-3"></div>
   </div>
  </Modal>
  )
}

export default EditMessageModal