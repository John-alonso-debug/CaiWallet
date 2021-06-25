/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-23 18:18:23
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/routes/safe/components/Settings/SpendingLimit/InfoDisplay/ResetTimeInfo.tsx
 */
import { IconText, Text } from '@gnosis.pm/safe-react-components'
import React, { ReactElement } from 'react'

import Row from 'src/components/layout/Row'

import DataDisplay from './DataDisplay'

interface ResetTimeInfoProps {
  title?: string
  label?: string
}

const ResetTimeInfo = ({ title, label }: ResetTimeInfoProps): ReactElement => {
  return (
    <DataDisplay title={title}>
      {label ? (
        <Row align="center" margin="md">
          <IconText iconSize="md" iconType="fuelIndicator" text={label} textSize="lg" />
        </Row>
      ) : (
        <Row align="center" margin="md">
          <Text size="lg">一次性消费限额</Text>
        </Row>
      )}
    </DataDisplay>
  )
}

export default ResetTimeInfo
