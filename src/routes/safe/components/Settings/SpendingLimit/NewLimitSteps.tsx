/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-23 18:24:00
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/routes/safe/components/Settings/SpendingLimit/NewLimitSteps.tsx
 */
import { Text } from '@gnosis.pm/safe-react-components'
import React, { ReactElement } from 'react'
import styled from 'styled-components'

import Img from 'src/components/layout/Img'
import AssetAmount from './assets/asset-amount.svg'
import Beneficiary from './assets/beneficiary.svg'
import Time from './assets/time.svg'

const StepWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  max-width: 720px;
  text-align: center;
`

const Step = styled.div`
  width: 24%;
  min-width: 120px;
  max-width: 164px;
`

const StepsLine = styled.div`
  height: 2px;
  flex: 1;
  background: #d4d5d3;
  margin: 46px 0;
`

export const NewLimitSteps = (): ReactElement => (
  <StepWrapper>
    <Step>
      <Img alt="Select Beneficiary" title="Beneficiary" height={96} src={Beneficiary} />

      <Text size="lg" color="placeHolder" strong center>
        选择接收人
      </Text>

      <Text size="lg" color="placeHolder" center>
        定义将能够使用津贴的接收人。
      </Text>

      <Text size="lg" color="placeHolder" center>
        接收人不必是这个钱包的所有者
      </Text>
    </Step>

    <StepsLine />

    <Step>
      <Img alt="Select asset and amount" title="Asset and Amount" height={96} src={AssetAmount} />

      <Text size="lg" color="placeHolder" strong center>
      选择资产和金额
      </Text>

      <Text size="lg" color="placeHolder" center>
      您可以为存储在钱包中的任何资产设置支出限额
      </Text>
    </Step>

    <StepsLine />

    <Step>
      <Img alt="Select time" title="Time" height={96} src={Time} />

      <Text size="lg" color="placeHolder" strong center> 
        选择时间
      </Text>

      <Text size="lg" color="placeHolder" center>
        您可以选择设置一次性消费限额或在定义的时间段后自动充值
      </Text>
    </Step>
  </StepWrapper>
)
