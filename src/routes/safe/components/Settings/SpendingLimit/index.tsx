/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-23 18:22:07
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/routes/safe/components/Settings/SpendingLimit/index.tsx
 */
import { Button, Text, Title } from '@gnosis.pm/safe-react-components'
import React, { ReactElement, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import Block from 'src/components/layout/Block'
import Col from 'src/components/layout/Col'
import Row from 'src/components/layout/Row'
import { currentSafeSpendingLimits } from 'src/logic/safe/store/selectors'
import { grantedSelector } from 'src/routes/safe/container/selector'

import { LimitsTable } from './LimitsTable'
import { getSpendingLimitData } from './LimitsTable/dataFetcher'
import { NewLimitModal } from './NewLimitModal'
import { NewLimitSteps } from './NewLimitSteps'
import { useStyles } from './style'

const InfoText = styled(Text)`
  margin-top: 16px;
`

export const SpendingLimitSettings = (): ReactElement => {
  const classes = useStyles()
  const granted = useSelector(grantedSelector)
  const allowances = useSelector(currentSafeSpendingLimits)
  const spendingLimitData = getSpendingLimitData(allowances)

  const [showNewSpendingLimitModal, setShowNewSpendingLimitModal] = useState(false)
  const openNewSpendingLimitModal = () => {
    setShowNewSpendingLimitModal(true)
  }
  const closeNewSpendingLimitModal = () => {
    setShowNewSpendingLimitModal(false)
  }

  return (
    <>
      <Block className={classes.container} grow="grow">
        <Title size="xs" withoutMargin>
          消费限额
        </Title>
        <InfoText size="lg">
          您可以为特定接收人设置规则，以便无需收集所有签名即可从此钱包中获取资金。
        </InfoText>
        {spendingLimitData?.length ? <LimitsTable data={spendingLimitData} /> : <NewLimitSteps />}
      </Block>

      {granted && (
        <>
          <Row align="end" className={classes.buttonRow} grow>
            <Col end="xs">
              <Button
                className={classes.actionButton}
                color="primary"
                size="md"
                data-testid="new-spending-limit-button"
                onClick={openNewSpendingLimitModal}
                variant="contained"
              >
                新消费限额
              </Button>
            </Col>
          </Row>
          {showNewSpendingLimitModal && <NewLimitModal close={closeNewSpendingLimitModal} open={true} />}
        </>
      )}
    </>
  )
}
