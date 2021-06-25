/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-23 15:10:49
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/routes/safe/components/Settings/Advanced/index.tsx
 */
import { Text, theme, Title } from '@gnosis.pm/safe-react-components'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { getModuleData } from './dataFetcher'
import { useStyles } from './style'
import { ModulesTable } from './ModulesTable'

import Block from 'src/components/layout/Block'
import { currentSafe } from 'src/logic/safe/store/selectors'
import { useAnalytics, SAFE_NAVIGATION_EVENT } from 'src/utils/googleAnalytics'

const InfoText = styled(Text)`
  margin-top: 16px;
`

const Bold = styled.strong`
  color: ${theme.colors.text};
`

const NoModuleLegend = (): React.ReactElement => (
  <InfoText color="secondaryLight" size="xl">
    没有启用模块
  </InfoText>
)

export const Advanced = (): React.ReactElement => {
  const classes = useStyles()
  const { nonce, modules } = useSelector(currentSafe) ?? {}
  const moduleData = modules ? getModuleData(modules) ?? null : null
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    trackEvent({ category: SAFE_NAVIGATION_EVENT, action: 'Settings', label: 'Advanced' })
  }, [trackEvent])

  return (
    <>
      {/* Nonce */}
      <Block className={classes.container}>
        <Title size="xs" withoutMargin>
          Safe Nonce
        </Title>
        <InfoText size="lg">
          出于安全原因，使用我们进行的交易需要按顺序执行。现在告诉你
          接下来将执行哪个交易。您可以在交易细节中找到交易的nonce。
        </InfoText>
        <InfoText color="secondaryLight" size="xl">
          当前 Nonce: <Bold>{nonce}</Bold>
        </InfoText>
      </Block>

      {/* Modules */}
      <Block className={classes.container}>
        <Title size="xs" withoutMargin>
          安全模块
        </Title>
        <InfoText size="lg">
          模块允许您自定义您的多签钱包的访问控制逻辑。模块有潜在的风险，所以确保只使用来自可信源的模块。了解关于模块的更多信息{' '}
          <a
            href="https://docs.gnosis.io/safe/docs/contracts_architecture/#3-module-management"
            rel="noopener noreferrer"
            target="_blank"
          >
            这里
          </a>
          .
        </InfoText>

        {!moduleData || !moduleData.length ? <NoModuleLegend /> : <ModulesTable moduleData={moduleData} />}
      </Block>
    </>
  )
}
