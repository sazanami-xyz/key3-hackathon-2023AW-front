import React from 'react'

import PropTypes from 'prop-types'
import Link from 'next/link'
import { useRouter } from 'next/router'

const GalleryCard11 = (props) => {
  const router = useRouter();

  const createParameter = () => {
    // console.log('router title --', props.title);
    // console.log('router subtitle --', props.subtitle);
    // console.log('router description --', props.description);
    // console.log('router image_src --', props.image_src);
    // console.log('router like --', props.like);
    router.push({
      pathname: props.image_linkurl,
      query: {
        image: props.image_src,
        title: props.title,
        comment: props.subtitle,
        like: props.like,
        description: props.description,
      }
    });
    // console.log('router title2 --', router.query.title);
    // console.log('router image2 --', router.query.image);
  };

  return (
    <>
      <div className={`gallery-card11-gallery-card ${props.rootClassName} `}>
        {/* <Link href={props.image_linkurl}> */}
        <img
          alt={props.image_alt}
          src={props.image_src}
          className="gallery-card11-image"
          onClick={createParameter}
        />
        {/* </Link> */}
        <h2 className="gallery-card11-text">{props.title}</h2>
        <span className="gallery-card11-text1">{props.subtitle}</span>
      </div>
      <style jsx>
        {`
          .gallery-card11-gallery-card {
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .gallery-card11-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .gallery-card11-text {
            align-self: flex-start;
            margin-top: var(--dl-space-space-halfunit);
            font-weight: 600;
            margin-bottom: var(--dl-space-space-halfunit);
          }
          .gallery-card11-text1 {
            color: var(--dl-color-gray-500);
            align-self: flex-start;
          }

          @media (max-width: 767px) {
            .gallery-card11-gallery-card {
              flex-direction: column;
            }
          }
          @media (max-width: 479px) {
            .gallery-card11-image {
              height: 10rem;
            }
          }
        `}
      </style>
    </>
  )
}

GalleryCard11.defaultProps = {
  subtitle: 'Lorem ipsum dolor sit amet',
  rootClassName: '',
  image_alt: 'image',
  title: 'Project Title',
  image_src:
    'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDEyfHxmb3Jlc3R8ZW58MHx8fHwxNjI2MjUxMjg4&ixlib=rb-1.2.1&h=1200',
  image_linkurl: '',
}

GalleryCard11.propTypes = {
  subtitle: PropTypes.string,
  rootClassName: PropTypes.string,
  image_alt: PropTypes.string,
  title: PropTypes.string,
  image_src: PropTypes.string,
  image_linkurl: PropTypes.string,
  description: PropTypes.string,
  like: PropTypes.string,
}

export default GalleryCard11
