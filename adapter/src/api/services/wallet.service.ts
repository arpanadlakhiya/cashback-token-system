import fs from "fs";
import * as ethUtil from "ethereumjs-util";
import Wallet, { hdkey } from "ethereumjs-wallet";
import * as Bip39 from "bip39";
import * as constants from "../../utils/constants";
import * as walletInterface from "../../interfaces/wallet.interface";
import * as genericUtils from "../../utils/genericUtils";
import * as hlf from "../../utils/hlfClient/hlfClient";

let wallet: Wallet;

export const registerWallet = async (
  username: string
) => {
  console.log(`WalletService : registerWalletToLedger :: Registering wallet for user: ${username}`);

  try {
    const wallet = await generateWallet();

    if (!wallet) {
      throw new Error("error occurred while generating user wallet");
    }

    const walletID = (await genericUtils.generateID()) + "@" + username;

    const walletObj: walletInterface.Wallet = {
      id: walletID,
      address: wallet.getAddressString(),
      creationTime: new Date().getTime().toString(),
      docType: constants.DOCTYPE_WALLET,
      status: constants.STATUS_ACTIVE,
      username: username,
    };

    console.log(`WalletService : registerWalletToLedger :: Pushing wallet details to ledger`);
    
    // Invoke Transaction
    await hlf.invoke(
      constants.contractName,
      constants.REGISTER_WALLET,
      [JSON.stringify(walletObj)]
    );

    console.log(`WalletService : registerWalletToLedger :: Wallet registraion sent to ledger for user ${username}`);

    return walletObj;
  } catch (e) {
    console.log(`WalletService : registerWalletToLedger :: Error in Register Wallet To Ledger due to ` + e.message)
    return null;
  }
};

export const generateWallet = async () => {
  console.log(`WalletService : generateWallet :: Generating wallet file`);
  try {
    const mnemonics = Bip39.generateMnemonic();
    console.log(`WalletService : generateWallet :: Generated mnemonics`);

    const seed: Buffer = await Bip39.mnemonicToSeed(mnemonics);
    console.log(`WalletService : generateWallet :: Generated seed`);

    const key = hdkey.fromMasterSeed(Buffer.from(seed.toString()));

    console.log(
      `WalletService : generateWallet :: Extracted key from Master seed`
    );
    wallet = key.getWallet();

    JSON.parse(JSON.stringify(key));
    console.log(`WalletService : generateWallet :: Extracted wallet from HDKey`);

    const keystoreFile = wallet.getV3Filename();
    console.log(
      `WalletService : generateWallet :: Storing key in file.` + keystoreFile
    );

    const v3JSON = await wallet
      .toV3String(constants.HD_WALLET_PASSPHRASE)
      .then(async (v3String: string) => {
        return v3String;
      });

    if (!fs.existsSync(constants.WALLET_KEYSTORE)) {
      await fs.promises.mkdir(constants.WALLET_KEYSTORE);
    }
    fs.writeFileSync(
      constants.WALLET_KEYSTORE + "/" + keystoreFile,
      JSON.stringify(v3JSON, null, 4),
      {
        encoding: "utf8",
      }
    );

    console.log(`WalletService : generateWallet :: Wallet file generated`);

    return wallet;
  } catch (e) {
    console.log(
      `WalletService : generateWallet :: Error in Generate Wallet Address Due to ` +
        e.message
    );

    return null;
  }
};

export const sign = async (data: string, signedWallet: Wallet) => {
	const hash = ethUtil.keccak256(Buffer.from(data));

	const signature = ethUtil.ecsign(hash, signedWallet.getPrivateKey());

	return ethUtil.toRpcSig(signature.v, signature.r, signature.s);
};

export const verify = async (publicAddress: string, hexedSignature: string) => {
  console.log(
    `WalletService : verify :: Recovering wallet address from signature ${hexedSignature}`
  );
  const hash = ethUtil.keccak256(Buffer.from(publicAddress));

  // recover signature from hex string
  const recoveredSignature = ethUtil.fromRpcSig(hexedSignature);

  const recoveredPublicAddress = ethUtil.ecrecover(
    hash,
    recoveredSignature.v,
    recoveredSignature.r,
    recoveredSignature.s
  );
  // recover public address (short)
  const recoverdAddress = ethUtil.bufferToHex(
    ethUtil.pubToAddress(recoveredPublicAddress)
  );

  console.log(
    `WalletService : verify :: Verifying Wallet publicAddress & hexedSignature ${
      publicAddress === recoverdAddress
    }`
  );

  return publicAddress === recoverdAddress;
};
