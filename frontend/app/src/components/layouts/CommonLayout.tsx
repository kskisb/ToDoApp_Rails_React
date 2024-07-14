import React from 'react';

import { Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import Header from 'components/layouts/Header'

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(3)
}));

interface CommonLayoutProps {
  children: React.ReactElement
}

// 全てのページで共通となるレイアウト
const CommonLayout = ({ children }: CommonLayoutProps) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <StyledContainer maxWidth="lg">
          <Grid container justifyContent="center">
            <Grid item>
              {children}
            </Grid>
          </Grid>
        </StyledContainer>
      </main>
    </>
  )
}

export default CommonLayout