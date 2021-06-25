/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-23 13:58:27
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/routes/safe/components/Apps/components/AddAppForm/AppAgreement.tsx
 */
import { Checkbox, Text } from '@gnosis.pm/safe-react-components'
import React from 'react'
import { useFormState } from 'react-final-form'
import styled from 'styled-components'

import { required } from 'src/components/forms/validator'
import Field from 'src/components/forms/Field'

const StyledCheckbox = styled(Checkbox)`
  margin: 0;
`

const AppAgreement = (): React.ReactElement => {
  const { visited } = useFormState({ subscription: { visited: true } })

  // trick to prevent having the field validated by default. Not sure why this happens in this form
  const validate = !visited?.agreementAccepted ? undefined : required

  return (
    <Field
      component={StyledCheckbox}
      label={<Text size="xl">此应用程序不是项目产品，我同意使用此应用程序的风险由我自己承担。</Text>}
      name="agreementAccepted"
      type="checkbox"
      validate={validate}
    />
  )
}

export default AppAgreement
