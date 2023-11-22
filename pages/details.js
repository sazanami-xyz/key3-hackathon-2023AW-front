import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

const Details = (props) => {
  return (
    <>
      <div className="details-container">
        <Head>
          <title>details - Character NFT template</title>
          <meta
            property="og:title"
            content="details - Character NFT template"
          />
        </Head>
        <div className="details-hero">
          <div className="details-container1">
            <img
              alt="image"
              src="/Characters/character-1.svg"
              className="details-image"
            />
          </div>
          <video
            src="https://pin.ski/445fOpH"
            loop
            poster="https://play.teleporthq.io/static/svg/videoposter.svg"
            preload="auto"
            autoPlay
            controls
            className="details-video"
          ></video>
          <div className="details-container2">
            <div className="details-container3">
              <h1 className="details-text">
                <span>On Monday mornings.</span>
                <br></br>
              </h1>
              <h2 className="details-text3">
                Magnificent things are very simple.
              </h2>
              <div className="details-btn-group">
                <button className="details-button button">mint this nft</button>
                <Link href="/">
                  <a className="details-link button">
                    <span>
                      <span>back</span>
                      <br></br>
                    </span>
                  </a>
                </Link>
              </div>
              <span className="details-text7">
                Depressing Monday morning. That downer feeling on the way to the
                office. Let&apos;s blow that mood away and head to work with a
                lift in your spirits!
              </span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .details-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
          }
          .details-hero {
            width: 100%;
            height: 998px;
            display: flex;
            padding: var(--dl-space-space-twounits);
            max-width: var(--dl-size-size-maxwidth);
            min-height: 80vh;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
            background-color: rgba(39, 38, 38, 0.99);
          }
          .details-container1 {
            flex: 0 0 auto;
            width: 473px;
            height: auto;
            display: flex;
            align-items: space-between;
            flex-direction: column;
          }
          .details-image {
            width: 473px;
            height: 576px;
            object-fit: cover;
          }
          .details-video {
            width: 320px;
            height: 203px;
          }
          .details-container2 {
            width: 100%;
            height: auto;
            display: flex;
            align-items: space-between;
            flex-direction: column;
          }
          .details-container3 {
            display: flex;
            margin-left: var(--dl-space-space-twounits);
            flex-direction: column;
          }
          .details-text {
            color: rgba(249, 242, 242, 0.99);
            font-size: 3rem;
          }
          .details-text3 {
            color: #f1eaea;
            margin-top: var(--dl-space-space-unit);
            font-weight: 600;
            margin-bottom: var(--dl-space-space-unit);
          }
          .details-btn-group {
            display: flex;
            position: relative;
            margin-top: var(--dl-space-space-unit);
            align-items: center;
            margin-bottom: var(--dl-space-space-unit);
            flex-direction: row;
          }
          .details-button {
            transition: 0.3s;
            margin-left: var(--dl-space-space-unit);
            padding-top: var(--dl-space-space-unit);
            padding-left: var(--dl-space-space-twounits);
            padding-right: var(--dl-space-space-twounits);
            padding-bottom: var(--dl-space-space-unit);
          }
          .details-button:hover {
            transform: scale(1.02);
          }
          .details-link {
            top: -442px;
            right: 7px;
            width: 170px;
            height: 48px;
            position: absolute;
            text-decoration: none;
          }
          .details-text7 {
            color: #f5f1f1;
            margin-top: var(--dl-space-space-twounits);
            margin-bottom: var(--dl-space-space-twounits);
            padding-right: var(--dl-space-space-threeunits);
          }
          @media (max-width: 991px) {
            .details-hero {
              padding: var(--dl-space-space-threeunits);
              flex-direction: column;
            }
            .details-image {
              order: 2;
            }
            .details-container3 {
              align-items: center;
              margin-left: 0px;
              margin-right: 0px;
              margin-bottom: var(--dl-space-space-twounits);
            }
            .details-text {
              text-align: center;
            }
            .details-text3 {
              text-align: center;
            }
            .details-text7 {
              text-align: center;
              padding-left: var(--dl-space-space-fourunits);
            }
          }
          @media (max-width: 767px) {
            .details-hero {
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
            }
            .details-image {
              width: 80%;
            }
          }
          @media (max-width: 479px) {
            .details-hero {
              padding-top: var(--dl-space-space-twounits);
              padding-left: var(--dl-space-space-unit);
              padding-right: var(--dl-space-space-unit);
              padding-bottom: var(--dl-space-space-twounits);
            }
            .details-container3 {
              margin-bottom: var(--dl-space-space-unit);
            }
            .details-btn-group {
              flex-direction: column;
            }
            .details-button {
              margin-top: var(--dl-space-space-unit);
              margin-left: 0px;
            }
            .details-text7 {
              padding-left: var(--dl-space-space-unit);
              padding-right: var(--dl-space-space-unit);
            }
          }
        `}
      </style>
    </>
  )
}

export default Details
