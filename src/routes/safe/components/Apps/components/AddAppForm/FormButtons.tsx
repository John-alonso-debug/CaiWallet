/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-25 15:43:38
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/routes/safe/components/Apps/components/AddAppForm/FormButtons.tsx
 */
import React, { ReactElement, useMemo } from 'react'
import { useFormState } from 'react-final-form'

import { Modal } from 'src/components/Modal'
import { SafeApp } from 'src/routes/safe/components/Apps/types'
import { isAppManifestValid } from 'src/routes/safe/components/Apps/utils'

interface Props {
  appInfo: SafeApp
  onCancel: () => void
}

export const FormButtons = ({ appInfo, onCancel }: Props): ReactElement => {
  const { valid, validating, visited } = useFormState({
    subscription: { valid: true, validating: true, visited: true },
  })

  const isSubmitDisabled = useMemo(() => {
    // if non visited, fields were not evaluated yet. Then, the default value is considered invalid
    const fieldsVisited = visited?.agreementAccepted && visited?.appUrl

    return validating || !valid || !fieldsVisited || !isAppManifestValid(appInfo)
  }, [validating, valid, visited, appInfo])

  return (
    <Modal.Footer.Buttons
      cancelButtonProps={{ onClick: onCancel }}
      confirmButtonProps={{ disabled: isSubmitDisabled, text: '添加' }}
    />
  )
}
