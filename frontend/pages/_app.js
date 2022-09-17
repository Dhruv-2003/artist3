import "../styles/globals.css";
import { chain, configureChains, createClient } from "@wagmi/core";
import { publicProvider } from "@wagmi/core/providers/public";
import { Web3ModalEthereum } from "@web3modal/ethereum";
// import type { ConfigOptions } from "@web3modal/react";
import { Web3ModalProvider } from "@web3modal/react";

const WC_PROJECT_ID = "8c4d09e2853e4ec315597853077f08ad";

// Configure chains and providers (rpc's)
const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [publicProvider()]
);

// Create wagmi client
const wagmiClient = createClient({
  autoConnect: true,
  connectors: Web3ModalEthereum.defaultConnectors({
    chains,
    appName: "web3Modal",
  }),
  provider,
});

// Configure web3modal
const modalConfig = {
  projectId: WC_PROJECT_ID,
  theme: "dark",
  accentColor: "orange",
};

function MyApp({ Component, pageProps }) {
  return (
    <Web3ModalProvider config={modalConfig} ethereumClient={wagmiClient}>
      <Component {...pageProps} />
    </Web3ModalProvider>
  );
}

export default MyApp;
