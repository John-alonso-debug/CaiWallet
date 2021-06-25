/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-23 10:44:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/components/AppLayout/Header/components/ProviderDetails/ConnectDetails.tsx
 */
import { withStyles } from '@material-ui/core/styles'
import * as React from 'react'

import ConnectButton from 'src/components/ConnectButton'

import Block from 'src/components/layout/Block'
import Paragraph from 'src/components/layout/Paragraph'
import Row from 'src/components/layout/Row'
import { KeyRing } from 'src/components/AppLayout/Header/components/KeyRing'
import { Card } from '@gnosis.pm/safe-react-components'
import styled from 'styled-components'

const styles = () => ({
  logo: {
    justifyContent: 'center',
  },
  text: {
    letterSpacing: '-0.6px',
    flexGrow: 1,
    textAlign: 'center',
  },
  connect: {
    textAlign: 'center',
    marginTop: '60px',
  },
  connectText: {
    letterSpacing: '1px',
  },
  img: {
    margin: '0px 2px',
  },
})

const StyledCard = styled(Card)`
  padding: 20px;
`
const ConnectDetails = ({ classes }) => (
  <StyledCard>
    <Row align="center" margin="lg">
      <Paragraph className={classes.text} noMargin size="xl" weight="bolder">
        连接钱包
      </Paragraph>
    </Row>

    <Row className={classes.logo}>
      <KeyRing center circleSize={60} dotRight={20} dotSize={20} dotTop={50} keySize={28} mode="error" />
    </Row>
    <Block className={classes.connect}>
      <ConnectButton data-testid="heading-connect-btn" />
    </Block>
  </StyledCard>
)

export default withStyles(styles as any)(ConnectDetails)
