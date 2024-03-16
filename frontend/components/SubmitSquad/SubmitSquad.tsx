'use client';

import {
  IDKitWidget,
  IErrorState,
  ISuccessResult,
  VerificationLevel,
  useIDKit
} from '@worldcoin/idkit';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Worldcoin } from '../Icons';
import { decodeAbiParameters } from 'viem';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

const unpack = (proof: `0x${string}`) => {
  return decodeAbiParameters([{ type: 'uint256[8]' }], proof)[0];
};

type SubmitSquadProps = {
  isDisabled: boolean;
};

export const SubmitSquad: React.FC<SubmitSquadProps> = ({
  isDisabled = true
}) => {
  const { setOpen } = useIDKit();
  const { enqueueSnackbar } = useSnackbar();
  const { primaryWallet } = useDynamicContext();
  const { address } = primaryWallet || {};

  const handleOnSuccess = (result: ISuccessResult) => {
    console.log({ result });
    const bigNumProofs = unpack((result as any).proof);
    const stringProofs = bigNumProofs.map((bn: any) => bn.toString(16));
    console.log(unpack((result as any).proof));
    console.log({ stringProofs });
    enqueueSnackbar('Submitted squad successfully', { variant: 'success' });
  };

  const handleOnError = (error: IErrorState) => {
    console.log({ error });
    enqueueSnackbar('Failed to submit squad', { variant: 'error' });
  };

  return (
    <>
      <IDKitWidget
        app_id={`app_${process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID}`}
        action='luffy'
        signal={address}
        onSuccess={handleOnSuccess}
        onError={handleOnError}
        verification_level={VerificationLevel.Orb}
      />
      <Button
        disabled={isDisabled}
        variant='outlined'
        startIcon={<Worldcoin />}
        onClick={() => setOpen(true)}
      >
        Submit Squad
      </Button>
    </>
  );
};
