import React from 'react'
import styled from 'styled-components'
import {
  Card,
  Button,
  Title,
  Text,
  Divider,
  ButtonLink,
  Dot,
  Icon,
  Link as LinkSRC,
} from '@gnosis.pm/safe-react-components'

import Link from 'src/components/layout/Link'
import Block from 'src/components/layout/Block'
import { LOAD_ADDRESS, OPEN_ADDRESS } from 'src/routes/routes'
import { onConnectButtonClick } from 'src/components/ConnectButton'
import { useSelector } from 'react-redux'
import { providerNameSelector } from 'src/logic/wallets/store/selectors'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 24px 0 0 0;
`
const StyledCardDouble = styled(Card)`
  display: flex;
  padding: 0;
`
const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 20px 0 0;
  max-width: 27%;
  height: 276px;
`
const CardsCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  width: 50%;
`
const StyledButton = styled(Button)`
  margin-top: auto;
  text-decoration: none;
`
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 16px 0;

  h5 {
    color: white;
  }
`
const StyledTitle = styled(Title)`
  margin: 0 0 0 16px;
`
const StyledTitleOnly = styled(Title)`
  margin: 0 0 16px 0;
`
const StyledButtonLink = styled(ButtonLink)`
  margin: 16px 0 16px -8px;
`

type Props = {
  isOldMultisigMigration?: boolean
}

export const WelcomeLayout = ({ isOldMultisigMigration }: Props): React.ReactElement => {
  const provider = useSelector(providerNameSelector)
  return (
    <Block>
      {/* Title */}
      <Title size="md" strong>
        欢迎
      </Title>

      {/* Subtitle */}
      {/* <Title size="xs">
        {isOldMultisigMigration ? (
          <>
            We will replicate the owner structure from your existing Gnosis MultiSig to let you test the new interface.
            As soon as you feel comfortable, start moving funds to your new Safe.
          </>
        ) : (
          <>
            Gnosis Safe is the most trusted platform to manage digital assets. <br /> Here is how to get started:{' '}
          </>
        )}
      </Title> */}

      <>
        <Wrapper>
          {/* Connect wallet */}
          <StyledCard>
            <TitleWrapper>
              <Dot color="primary">
                {!provider ? <Title size="xs">1</Title> : <Icon color="white" type="check" size="md" />}
              </Dot>
              <StyledTitle size="sm" strong withoutMargin>
                连接钱包
              </StyledTitle>
            </TitleWrapper>
            <Text size="xl">
              我们支持多种钱包，您可以选择与您的钱包进行交互。
            </Text>
            <StyledButtonLink textSize="xl" color="primary" iconType="externalLink" iconSize="sm">
              <LinkSRC
                size="xl"
                href="https://help.gnosis-safe.io/en/articles/4689442-why-do-i-need-to-connect-a-wallet"
                target="_blank"
                rel="noopener noreferrer"
                title="More info about: Why do I need to connect a wallet?"
              >
                为什么我需要连接钱包？
              </LinkSRC>
            </StyledButtonLink>
            <StyledButton
              size="lg"
              color="primary"
              variant="contained"
              onClick={onConnectButtonClick}
              disabled={!!provider}
              data-testid="connect-btn"
            >
              <Text size="xl" color="white">
                连接钱包
              </Text>
            </StyledButton>
          </StyledCard>

          <StyledCardDouble disabled={!provider}>
            {/* Create safe */}
            <CardsCol>
              <TitleWrapper>
                <Dot color="primary">
                  <Title size="xs">2</Title>
                </Dot>
                <StyledTitle size="sm" strong withoutMargin>
                  创建多签
                </StyledTitle>
              </TitleWrapper>
              <Text size="xl">
                创建一个由一个或多个所有者控制的新多签钱包。 <br />
                您需要为创建新多签钱包支付网络费用。
              </Text>
              <StyledButton size="lg" color="primary" variant="contained" component={Link} to={OPEN_ADDRESS}>
                <Text size="xl" color="white">
                  + 创建新的多签钱包
                </Text>
              </StyledButton>
            </CardsCol>

            <Divider orientation="vertical" />

            {/* Load safe */}
            <CardsCol>
              <StyledTitleOnly size="sm" strong withoutMargin>
                添加已经存在的多签钱包
              </StyledTitleOnly>
              <Text size="xl">
                已经有了多签钱包？您想从其他设备访问您的多签钱包吗？使用您的安全地址轻松添加它。
              </Text>
              <StyledButton
                variant="bordered"
                iconType="safe"
                iconSize="sm"
                size="lg"
                color="secondary"
                component={Link}
                to={LOAD_ADDRESS}
              >
                <Text size="xl" color="secondary">
                  添加存在的多签钱包
                </Text>
              </StyledButton>
            </CardsCol>
          </StyledCardDouble>
        </Wrapper>
      </>
    </Block>
  )
}
