import React from 'react'

import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const NavigationLinks = (props) => {

  const router = useRouter();

  const moveUpload = () => {
    router.push({
      pathname: '/upload',
    });
  };

  return (
    <>
      <nav className={`navigation-links-nav ${props.rootClassName} `}>
        <span className="navigation-links-text">{props.text}</span>
        <span className="navigation-links-text1">{props.text1}</span>
        <span className="navigation-links-text2">{props.text2}</span>
        <span className="navigation-links-text3">{props.text3}</span>
        <span className="navigation-links-text4" onClick={moveUpload}>{props.text4}</span>
      </nav>
      <style jsx>
        {`
          .navigation-links-nav {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            flex-direction: row;
          }
          .navigation-links-text1 {
            margin-left: var(--dl-space-space-twounits);
          }
          .navigation-links-text2 {
            margin-left: var(--dl-space-space-twounits);
          }
          .navigation-links-text3 {
            margin-left: var(--dl-space-space-twounits);
          }
          .navigation-links-text4 {
            margin-left: var(--dl-space-space-twounits);
          }

          @media (max-width: 767px) {
            .navigation-links-nav {
              align-items: flex-start;
              flex-direction: column;
            }
            .navigation-links-text {
              margin-bottom: var(--dl-space-space-unit);
            }
            .navigation-links-text1 {
              margin-left: 0;
              margin-bottom: var(--dl-space-space-unit);
            }
            .navigation-links-text2 {
              margin-left: 0;
              margin-bottom: var(--dl-space-space-unit);
            }
            .navigation-links-text3 {
              margin-left: 0;
              margin-bottom: var(--dl-space-space-unit);
            }
            .navigation-links-text4 {
              margin-left: 0;
              margin-bottom: var(--dl-space-space-unit);
            }
          }
        `}
      </style>
    </>
  )
}

NavigationLinks.defaultProps = {
  text: 'About',
  text3: 'Team',
  text4: 'Blog',
  text1: 'Features',
  rootClassName: '',
  text2: 'Pricing',
}

NavigationLinks.propTypes = {
  text: PropTypes.string,
  text3: PropTypes.string,
  text4: PropTypes.string,
  text1: PropTypes.string,
  rootClassName: PropTypes.string,
  text2: PropTypes.string,
}

export default NavigationLinks
