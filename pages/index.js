import React from 'react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import Web3Mint from './utils/Web3Mint.json'
import { Buffer } from 'buffer';
import { useRouter } from 'next/router'

import NavigationLinks from '../components/navigation-links'
import GalleryCard11 from '../components/gallery-card11'

const Search = (props) => {

  const CONTRACT_ADDRESS =
  '0x5a2474F2C16E858a86308aACd0DB717c24B4A693';

  const [currentAccount, setCurrentAccount] = useState("");

  const [nftList, setNftList] = useState([]);

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

    getList();
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

  const getList = async () => {
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
        let nftTxn = await connectedContract.list();
        console.log('getting list...please wait.');
        let s = Buffer.from(nftTxn, 'base64').toString();
        console.log(
          'get list', nftTxn
        );
        console.log('decode:', s);

        // ,で分割
        const jsonObj = JSON.parse(s);
        console.log("jsonObj: ", jsonObj);

        const worklist = [];
        jsonObj.attribute.forEach((obj, i) => {
          worklist.push(obj);
        });
        console.log("getList result : ",worklist);
        setNftList([...nftList, ...worklist]);

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className="search-container">
        <Head>
          <title>Piacere</title>
          <meta property="og:title" content="search - Character NFT template" />
        </Head>
        <header data-role="Header" className="search-header">
          <img
            alt="Piacere"
            src="/piacere.png"
            className="search-image"
            onClick={moveTop}
          />
          <div className="search-nav">
            <NavigationLinks rootClassName="rootClassName10"></NavigationLinks>
          </div>
          <div className="search-btn-group">
            <button className="button" onClick={connectWallet}>Connect Wallet</button>
          </div>
          <div data-role="BurgerMenu" className="search-burger-menu">
            <svg viewBox="0 0 1024 1024" className="search-icon">
              <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
            </svg>
          </div>
          <div data-role="MobileMenu" className="search-mobile-menu">
            <div className="search-nav1">
              <div className="search-container1">
                <img
                  alt="image"
                  src="https://presentation-website-assets.teleporthq.io/logos/logo.png"
                  className="search-image1"
                />
                <div data-role="CloseMobileMenu" className="search-menu-close">
                  <svg viewBox="0 0 1024 1024" className="search-icon02">
                    <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                  </svg>
                </div>
              </div>
              <NavigationLinks rootClassName="rootClassName11"></NavigationLinks>
            </div>
            <div>
              <svg
                viewBox="0 0 950.8571428571428 1024"
                className="search-icon04"
              >
                <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
              </svg>
              <svg
                viewBox="0 0 877.7142857142857 1024"
                className="search-icon06"
              >
                <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
              </svg>
              <svg
                viewBox="0 0 602.2582857142856 1024"
                className="search-icon08"
              >
                <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
              </svg>
            </div>
          </div>
        </header>
        <div className="search-gallery">
        {
          (nftList.length !== 0) ?
            nftList.map((item, i) => (
              <GalleryCard11 image_src={item.image} key={i} title={item.name} subtitle={item.comment} image_linkurl={`/items/${item.name}`} description={item.description} like={item.like} rootClassName="rootClassName1" />
            )) : <p>No NFT Image</p> 
        }
        </div>
      </div>
      <style jsx>
        {`
          .search-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .search-header {
            top: -3px;
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
          .search-image {
            height: 5rem;
          }
          .search-nav {
            display: flex;
          }
          .search-btn-group {
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
          }
          .search-login {
            border-width: 0px;
            margin-right: var(--dl-space-space-twounits);
          }
          .search-burger-menu {
            display: none;
          }
          .search-icon {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
          }
          .search-mobile-menu {
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
          .search-nav1 {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .search-container1 {
            width: 100%;
            display: flex;
            align-items: center;
            margin-bottom: var(--dl-space-space-threeunits);
            justify-content: space-between;
          }
          .search-image1 {
            height: 2rem;
          }
          .search-menu-close {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .search-icon02 {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
          }
          .search-icon04 {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
            margin-right: var(--dl-space-space-twounits);
          }
          .search-icon06 {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
            margin-right: var(--dl-space-space-twounits);
          }
          .search-icon08 {
            width: var(--dl-size-size-xsmall);
            height: var(--dl-size-size-xsmall);
          }
          .search-gallery {
            top: 113px;
            left: -1px;
            width: 1200px;
            height: 887px;
            display: grid;
            padding: var(--dl-space-space-threeunits);
            grid-gap: var(--dl-space-space-unit);
            position: absolute;
            max-width: var(--dl-size-size-maxwidth);
            grid-template-columns: 1fr 1fr 1fr;
          }
          @media (max-width: 991px) {
            .search-gallery {
              grid-template-columns: 1fr 1fr;
            }
          }
          @media (max-width: 767px) {
            .search-header {
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
            }
            .search-nav {
              display: none;
            }
            .search-btn-group {
              display: none;
            }
            .search-burger-menu {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .search-gallery {
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
            }
          }
          @media (max-width: 479px) {
            .search-header {
              padding: var(--dl-space-space-unit);
            }
            .search-mobile-menu {
              padding: 16px;
            }
            .search-gallery {
              padding-top: var(--dl-space-space-twounits);
              padding-left: var(--dl-space-space-unit);
              padding-right: var(--dl-space-space-unit);
              padding-bottom: var(--dl-space-space-twounits);
            }
          }
        `}
      </style>
    </>
  )
}

export default Search
