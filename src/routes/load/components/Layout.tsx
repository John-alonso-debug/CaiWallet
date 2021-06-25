/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-25 15:12:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/routes/load/components/Layout.tsx
 */
import IconButton from '@material-ui/core/IconButton'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import React, { ReactElement } from 'react'

import Stepper, { StepperPage } from 'src/components/Stepper'
import Block from 'src/components/layout/Block'
import Heading from 'src/components/layout/Heading'
import Row from 'src/components/layout/Row'
import DetailsForm, { safeFieldsValidation } from 'src/routes/load/components/DetailsForm'
import OwnerList from 'src/routes/load/components/OwnerList'
import ReviewInformation from 'src/routes/load/components/ReviewInformation'

import { history } from 'src/store'
import { secondary, sm } from 'src/theme/variables'
import { LoadFormValues } from '../container/Load'

const steps = ['名称和地址', '拥有者', '检查']
const buttonLabels = ['下一步', '检查', '添加']

const iconStyle = {
  color: secondary,
  padding: sm,
  marginRight: '5px',
}

const back = () => {
  history.goBack()
}

const formMutators = {
  setValue: ([field, value], state, { changeValue }) => {
    changeValue(state, field, () => value)
  },
}

interface LayoutProps {
  provider?: string
  userAddress: string
  onLoadSafeSubmit: (values: LoadFormValues) => void
}

const Layout = ({ onLoadSafeSubmit, provider, userAddress }: LayoutProps): ReactElement => (
  <>
    {provider ? (
      <Block>
        <Row align="center">
          <IconButton disableRipple onClick={back} style={iconStyle}>
            <ChevronLeft />
          </IconButton>
          <Heading tag="h2">添加存在的多签钱包</Heading>
        </Row>
        <Stepper<LoadFormValues>
          buttonLabels={buttonLabels}
          mutators={formMutators}
          onSubmit={onLoadSafeSubmit}
          steps={steps}
          testId="load-safe-form"
        >
          <StepperPage validate={safeFieldsValidation} component={DetailsForm} />
          <StepperPage component={OwnerList} />
          <StepperPage userAddress={userAddress} component={ReviewInformation} />
        </Stepper>
      </Block>
    ) : (
      <div>未检测到帐户      </div>
    )}
  </>
)

export default Layout
