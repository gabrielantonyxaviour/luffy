'use client';

import {
  DynamicUserProfile,
  useDynamicContext
} from '@dynamic-labs/sdk-react-core';
import { Avatar, Button } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { useClientAuth } from '@/hooks';

const styles = {
  avatar: {
    border: '2px solid #ffffffaa',
    cursor: 'pointer',
    width: 44,
    height: 44,
    '&:hover': {
      borderColor: '#fff'
    }
  }
};

export const DynamicWidget = () => {
  const { isAuthenticated } = useClientAuth();
  const { setShowDynamicUserProfile, setShowAuthFlow, primaryWallet } =
    useDynamicContext();
  const { address } = primaryWallet || {};

  return (
    <>
      {isAuthenticated ? (
        <Avatar
          onClick={() => setShowDynamicUserProfile(true)}
          src={`https://noun-api.com/beta/pfp?name=${address}`}
          sx={styles.avatar}
        />
      ) : (
        <Button
          onClick={() => setShowAuthFlow(true)}
          variant='outlined'
          endIcon={<ChevronRight />}
        >
          Play Now
        </Button>
      )}
      <DynamicUserProfile />
    </>
  );
};
