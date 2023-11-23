import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import Web3Mint from '../utils/Web3Mint.json'
import NavigationLinks1 from '../../components/navigation-links1'

const Item = (props) => {
  const router = useRouter();
  const name = router.query.name;

  const title = router.query.title;
  const comment = router.query.comment;
  const image = router.query.image;
  const description = router.query.description;
  const like = router.query.like;

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
  '0x5a2474F2C16E858a86308aACd0DB717c24B4A693';

  const addLike = async () => {
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
        const tokenid = title.substring(title.indexOf(':')+2);
        const tokenIdNo = parseInt(tokenid);
        let nftTxn = await connectedContract.addLike(tokenIdNo);
        console.log('Mining...please wait.');
        await nftTxn.wait();
        console.log('addLike finished');
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className="item-container">
        <Head>
          <title>Piacere</title>
          <meta property="og:title" content="item - Character NFT template" />
        </Head>
        <div className="item-gallery-card">
          <img
            alt="image"
            src={image}
            className="item-image"
          />
          <h2 className="item-text">{title}</h2>
          <span className="item-text01">
            <span>{comment}</span>
            <br></br>
            <span>{description}</span>
            <br></br>
          </span>
          <span className="item-text06">likes</span>
          <span className="item-text07">{like}</span>
          <span className="item-text02">
          <button><img src='/like.png' alt='いいね' onClick={addLike} className='button01' /></button>
          </span>
        </div>
        <header data-role="Header" className="item-header">
          <img
            alt="logo"
            src="/piacere.png"
            className="item-image1"
            onClick={moveTop}
          />
          <div className="item-nav">
            <NavigationLinks1 rootClassName="rootClassName10"></NavigationLinks1>
          </div>
          <div className="item-btn-group">
            <button className="button" onClick={connectWallet}>Connect Wallet</button>
          </div>
          <div data-role="BurgerMenu" className="item-burger-menu">
            <svg viewBox="0 0 1024 1024" className="item-icon">
              <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
            </svg>
          </div>
          <div data-role="MobileMenu" className="item-mobile-menu">
            <div className="item-nav1">
              <div className="item-container1">
                <img
                  alt="image"
                  src="https://presentation-website-assets.teleporthq.io/logos/logo.png"
                  className="item-image2"
                />
                <div data-role="CloseMobileMenu" className="item-menu-close">
                  <svg viewBox="0 0 1024 1024" className="item-icon02">
                    <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                  </svg>
                </div>
              </div>
              <NavigationLinks1 rootClassName="rootClassName11"></NavigationLinks1>
            </div>
            <div>
              <svg viewBox="0 0 950.8571428571428 1024" className="item-icon04">
                <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
              </svg>
              <svg viewBox="0 0 877.7142857142857 1024" className="item-icon06">
                <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
              </svg>
              <svg viewBox="0 0 602.2582857142856 1024" className="item-icon08">
                <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
              </svg>
            </div>
          </div>
        </header>
        <h1>Heading</h1>
        <span>Text</span>
      </div>
      <style jsx>
        {`
          .item-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .item-gallery-card {
            width: 644px;
            height: 772px;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .item-image {
            left: -206px;
            width: 100%;
            bottom: -141px;
            height: 100%;
            position: absolute;
            object-fit: cover;
          }
          .item-text {
            top: 228px;
            right: -167px;
            width: 350px;
            height: 33px;
            position: absolute;
            align-self: flex-start;
            font-weight: 600;
          }
          .button01 {
            height: 2rem;
            top: -40px;
            right: 110px;
            position: absolute;
          }
          .button01:hover {
            opacity: 0.5;
          }          
          .item-text01 {
            top: 284px;
            right: -10px;
            position: absolute;
          }
          .item-text06 {
            top: 390px;
            color: var(--dl-color-gray-500);
            right: 50px;
            position: absolute;
            align-self: flex-start;
          }
          .item-text07 {
            top: 390px;
            right: 100px;
            position: absolute;
          }
          .item-text02 {
            top: 420px;
            right: 40px;
            position: absolute;
          }
          .item-header {
            top: 2px;
            left: -2px;
            width: 100%;
            display: flex;
            position: absolute;
            max-width: var(--dl-size-size-maxwidth);
            align-items: center;
            padding-top: var(--dl-space-space-twounits);
            padding-left: var(--dl-space-space-threeunits);
            padding-right: var(--dl-space-space-threeunits);
            padding-bottom: var(--dl-space-space-twounits);
            justify-content: space-between;
          }
          .item-image1 {
            height: 5rem;
          }
          .item-nav {
            display: flex;
          }
          .item-btn-group {
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
          }
          .item-login {
            border-width: 0px;
            margin-right: var(--dl-space-space-twounits);
          }
          .item-burger-menu {
            display: none;
          }
          .item-icon {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
          }
          .item-mobile-menu {
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
          .item-nav1 {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .item-container1 {
            width: 100%;
            display: flex;
            align-items: center;
            margin-bottom: var(--dl-space-space-threeunits);
            justify-content: space-between;
          }
          .item-image2 {
            height: 2rem;
          }
          .item-menu-close {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .item-icon02 {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
          }
          .item-icon04 {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
            margin-right: var(--dl-space-space-twounits);
          }
          .item-icon06 {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
            margin-right: var(--dl-space-space-twounits);
          }
          .item-icon08 {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
          }
          @media (max-width: 767px) {
            .item-gallery-card {
              flex-direction: column;
            }
            .item-header {
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
            }
            .item-nav {
              display: none;
            }
            .item-btn-group {
              display: none;
            }
            .item-burger-menu {
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
          @media (max-width: 479px) {
            .item-image {
              height: 10rem;
            }
            .item-header {
              padding: var(--dl-space-space-unit);
            }
            .item-mobile-menu {
              padding: 16px;
            }
          }
        `}
      </style>
    </>
  )
}

export default Item
