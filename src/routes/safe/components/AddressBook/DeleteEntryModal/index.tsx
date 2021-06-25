/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-23 13:50:02
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/routes/safe/components/AddressBook/DeleteEntryModal/index.tsx
 */
import { Text } from '@gnosis.pm/safe-react-components'
import React, { ReactElement } from 'react'

import { Modal } from 'src/components/Modal'
import GnoForm from 'src/components/forms/GnoForm'
import { Entry } from 'src/routes/safe/components/AddressBook'

export const DELETE_ENTRY_BTN_ID = 'delete-entry-btn-id'

interface DeleteEntryModalProps {
  deleteEntryModalHandler: () => void
  entryToDelete: Entry
  isOpen: boolean
  onClose: () => void
}

export const DeleteEntryModal = ({
  deleteEntryModalHandler,
  entryToDelete,
  isOpen,
  onClose,
}: DeleteEntryModalProps): ReactElement => {
  const handleDeleteEntrySubmit = () => {
    deleteEntryModalHandler()
  }

  return (
    <Modal description="Delete entry" handleClose={onClose} open={isOpen} title="Delete entry">
      <Modal.Header onClose={onClose}>
        <Modal.Header.Title>删除</Modal.Header.Title>
      </Modal.Header>
      <GnoForm onSubmit={handleDeleteEntrySubmit}>
        {() => (
          <>
            <Modal.Body>
              <Text size="xl">
                这个操作将删除{' '}
                <Text size="xl" strong as="span">
                  {entryToDelete.entry.name}
                </Text>{' '}
                
              </Text>
            </Modal.Body>
            <Modal.Footer>
              <Modal.Footer.Buttons
                cancelButtonProps={{ onClick: onClose }}
                confirmButtonProps={{ color: 'error', testId: DELETE_ENTRY_BTN_ID, text: 'Delete' }}
              />
            </Modal.Footer>
          </>
        )}
      </GnoForm>
    </Modal>
  )
}
