import React from 'react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import { Web3Storage } from 'web3.storage'
import Web3Mint from './utils/Web3Mint.json'
import { useRouter } from 'next/router'

import NavigationLinks2 from '../components/navigation-links2'

const Upload = (props) => {

  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Make sure you have MetaMask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWallet = async () =>{
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      /*
       * ウォレットアドレスに対してアクセスをリクエストしています。
       */
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      /*
       * ウォレットアドレスを currentAccount に紐付けます。
       */
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const CONTRACT_ADDRESS =
  '0xD20E9C24cdD9535a41eA69bD98d0C40BDdFF36B3';

  const askContractToMintNft = async (ipfs) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          Web3Mint.abi,
          signer
        );
        console.log('Going to pop wallet now to pay gas...');
        let nftTxn = await connectedContract.mintIpfsNFT('PIACERE',ipfs);
        console.log('Mining...please wait.');
        await nftTxn.wait();
        console.log(
          `Mined, see transaction: https://sepolia.etherscan.io/tx/${nftTxn.hash}`
        );
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJhOTdkODJGMDBEZjYwY0Y3MmJCYjYwZDhmYzg1ZTA1RmU5NjBDMzAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTc4MTc3OTUzMDMsIm5hbWUiOiJ0b2tlbjEifQ.KpErAGKXSxFgv18Ds6UWvHucHi3jSD5x5gFlEAmaeog';
  const imageToNFT = async (e) => {
    const client = new Web3Storage({ token: API_KEY })
    const image = e.target
    console.log(image)

    const rootCid = await client.put(image.files, {
        name: 'experiment',
        maxRetries: 3
    })
    const res = await client.get(rootCid) // Web3Response
    const files = await res.files() // Web3File[]
    for (const file of files) {
      console.log('file.cid:',file.cid)
      console.log('rootCid:',rootCid)
      askContractToMintNft(rootCid)
    }
  };

  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  const router = useRouter();

  const moveTop = () => {
    router.push({
      pathname: '/',
    });
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <>
      <div className="upload-container">
        <Head>
          <title>upload - Character NFT template</title>
          <meta property="og:title" content="upload - Character NFT template" />
        </Head>
        <div data-thq="thq-dropdown" className="upload-thq-dropdown list-item">
          <ul data-thq="thq-dropdown-list" className="upload-dropdown-list">
            <li data-thq="thq-dropdown" className="upload-dropdown list-item">
              <div
                data-thq="thq-dropdown-toggle"
                className="upload-dropdown-toggle"
              >
                <span className="upload-text">Sub-menu Item</span>
              </div>
            </li>
            <li data-thq="thq-dropdown" className="upload-dropdown1 list-item">
              <div
                data-thq="thq-dropdown-toggle"
                className="upload-dropdown-toggle1"
              >
                <span className="upload-text1">Sub-menu Item</span>
              </div>
            </li>
            <li data-thq="thq-dropdown" className="upload-dropdown2 list-item">
              <div
                data-thq="thq-dropdown-toggle"
                className="upload-dropdown-toggle2"
              >
                <span className="upload-text2">Sub-menu Item</span>
              </div>
            </li>
          </ul>
        </div>
        <header data-role="Header" className="upload-header">
          <img
            alt="logo"
            src="/piacere.png"
            className="upload-image"
            onClick={moveTop}
          />
          <div className="upload-nav">
            <NavigationLinks2 rootClassName="rootClassName10"></NavigationLinks2>
          </div>
          <div className="upload-btn-group">
            <button className="button" onClick={connectWallet}>Connect Wallet</button>
          </div>
          <div data-role="BurgerMenu" className="upload-burger-menu">
            <svg viewBox="0 0 1024 1024" className="upload-icon">
              <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
            </svg>
          </div>
          <div data-role="MobileMenu" className="upload-mobile-menu">
            <div className="upload-nav1">
              <div className="upload-container1">
                <img
                  alt="image"
                  src="https://presentation-website-assets.teleporthq.io/logos/logo.png"
                  className="upload-image1"
                />
                <div data-role="CloseMobileMenu" className="upload-menu-close">
                  <svg viewBox="0 0 1024 1024" className="upload-icon02">
                    <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                  </svg>
                </div>
              </div>
              <NavigationLinks2 rootClassName="rootClassName11"></NavigationLinks2>
            </div>
            <div>
              <svg
                viewBox="0 0 950.8571428571428 1024"
                className="upload-icon04"
              >
                <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
              </svg>
              <svg
                viewBox="0 0 877.7142857142857 1024"
                className="upload-icon06"
              >
                <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
              </svg>
              <svg
                viewBox="0 0 602.2582857142856 1024"
                className="upload-icon08"
              >
                <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
              </svg>
            </div>
          </div>
        </header>
        <div className="outerBox">
      {currentAccount === "" ? (
        renderNotConnectedContainer()
      ) : (
        <p>If you choose image, you can mint your NFT</p>
      )}
      <div className="title">
      </div>
      <div className="nftUplodeBox">
        <div className="imageLogoAndText">
          <p>here, Drag & Drop your photo!</p>
        </div>
        <input className="nftUploadInput" multiple name="imageURL" type="file" accept=".jpg , .jpeg , .png" onChange={imageToNFT} />
      </div>
      {/* <p>または</p>
      <button variant="contained">
        ファイルを選択
        <input className="nftUploadInput" type="file" accept=".jpg , .jpeg , .png" onChange={imageToNFT}/>
      </button> */}
    </div>

      </div>
      <style jsx>
        {`
          .upload-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .upload-thq-dropdown {
            top: 164px;
            left: 486px;
            cursor: pointer;
            display: inline-block;
            position: absolute;
            border-radius: var(--dl-radius-radius-radius2);
          }
          .upload-dropdown-list {
            left: 0%;
            width: max-content;
            display: none;
            z-index: 100;
            position: absolute;
            min-width: 100%;
            transition: 0.3s;
            align-items: stretch;
            border-color: #d9d9d9;
            border-width: 1px;
            border-radius: var(--dl-radius-radius-radius4);
            flex-direction: column;
            list-style-type: none;
            background-color: var(--dl-color-gray-white);
            list-style-position: inside;
          }
          .upload-dropdown {
            cursor: pointer;
            display: inline-block;
            position: relative;
            border-radius: var(--dl-radius-radius-radius2);
          }
          .upload-dropdown-toggle {
            fill: #595959;
            color: #595959;
            width: 100%;
            display: inline-flex;
            transition: 0.3s;
            align-items: center;
            padding-top: var(--dl-space-space-halfunit);
            padding-left: var(--dl-space-space-unit);
            border-radius: var(--dl-radius-radius-radius4);
            padding-right: var(--dl-space-space-unit);
            padding-bottom: var(--dl-space-space-halfunit);
          }
          .upload-dropdown-toggle:hover {
            fill: #fff;
            color: #fff;
            background-color: #595959;
          }
          .upload-text {
            width: 100%;
            cursor: pointer;
            display: flex;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
          }
          .upload-dropdown1 {
            cursor: pointer;
            display: inline-block;
            position: relative;
            border-radius: var(--dl-radius-radius-radius2);
          }
          .upload-dropdown-toggle1 {
            fill: #595959;
            color: #595959;
            width: 100%;
            display: inline-flex;
            transition: 0.3s;
            align-items: center;
            padding-top: var(--dl-space-space-halfunit);
            padding-left: var(--dl-space-space-unit);
            border-radius: var(--dl-radius-radius-radius4);
            padding-right: var(--dl-space-space-unit);
            padding-bottom: var(--dl-space-space-halfunit);
          }
          .upload-dropdown-toggle1:hover {
            fill: #fff;
            color: #fff;
            background-color: #595959;
          }
          .upload-text1 {
            width: 100%;
            cursor: pointer;
            display: flex;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
          }
          .upload-dropdown2 {
            cursor: pointer;
            display: inline-block;
            position: relative;
            border-radius: var(--dl-radius-radius-radius2);
          }
          .upload-dropdown-toggle2 {
            fill: #595959;
            color: #595959;
            width: 100%;
            display: inline-flex;
            transition: 0.3s;
            align-items: center;
            padding-top: var(--dl-space-space-halfunit);
            padding-left: var(--dl-space-space-unit);
            border-radius: var(--dl-radius-radius-radius4);
            padding-right: var(--dl-space-space-unit);
            padding-bottom: var(--dl-space-space-halfunit);
          }
          .upload-dropdown-toggle2:hover {
            fill: #fff;
            color: #fff;
            background-color: #595959;
          }
          .upload-text2 {
            width: 100%;
            cursor: pointer;
            display: flex;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
          }
          .upload-header {
            width: 100%;
            display: flex;
            max-width: var(--dl-size-size-maxwidth);
            align-items: center;
            padding-top: var(--dl-space-space-twounits);
            padding-left: var(--dl-space-space-threeunits);
            padding-right: var(--dl-space-space-threeunits);
            padding-bottom: var(--dl-space-space-twounits);
            justify-content: space-between;
          }
          .upload-image {
            height: 5rem;
          }
          .upload-nav {
            display: flex;
          }
          .upload-btn-group {
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
          }
          .upload-login {
            border-width: 0px;
            margin-right: var(--dl-space-space-twounits);
          }
          .upload-burger-menu {
            display: none;
          }
          .upload-icon {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
          }
          .upload-mobile-menu {
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100vh;
            display: none;
            padding: 32px;
            z-index: 100;
            position: absolute;
            flex-direction: column;
            justify-content: space-between;
            background-color: #fff;
          }
          .upload-nav1 {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .upload-container1 {
            width: 100%;
            display: flex;
            align-items: center;
            margin-bottom: var(--dl-space-space-threeunits);
            justify-content: space-between;
          }
          .upload-image1 {
            height: 2rem;
          }
          .upload-menu-close {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .upload-icon02 {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
          }
          .upload-icon04 {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
            margin-right: var(--dl-space-space-twounits);
          }
          .upload-icon06 {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
            margin-right: var(--dl-space-space-twounits);
          }
          .upload-icon08 {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
          }

          .outerBox {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            border: none;
            padding: 36px;
            border-radius: 10px;
            box-shadow: 0px 0px 2px gray;
            height: 70%;
            color: gray;
          }
          
          .outerBox h2 {
            font-weight: 600;
            margin-top: 5px;
          }
          
          .nftUplodeBox {
            border: 2px dashed #2d6395;
            padding: 35px 60px;
            position: relative;
          }
          
          .imageLogoAndText p {
            margin-bottom: 0px;
          }
          
          .nftUploadInput {
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
          }

          @media (max-width: 767px) {
            .upload-header {
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
            }
            .upload-nav {
              display: none;
            }
            .upload-btn-group {
              display: none;
            }
            .upload-burger-menu {
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
          @media (max-width: 479px) {
            .upload-header {
              padding: var(--dl-space-space-unit);
            }
            .upload-mobile-menu {
              padding: 16px;
            }
          }
        `}
      </style>
    </>
  )
}

export default Upload
