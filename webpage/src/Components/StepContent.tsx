import { ConnectWallet } from "../Steps/ConnectWallet";
import { Networks } from "../Steps/Networks";

interface Props {
  step: number;
  setWalletConnected: (walletConnected: boolean) => void;
  next: () => void;
}

export const StepContent = ({step, setWalletConnected, next}: Props) => {
  return (
    <>
    { step === 1 && <ConnectWallet setWalletConnected={setWalletConnected} />}
    { step === 2 && <Networks />}
    </>
  );
};