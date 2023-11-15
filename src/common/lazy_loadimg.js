import React from 'react';
import {LazyLoadImage} from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';
React.lazy(() => import('react-lazy-load-image-component/src/effects/blur.css'));
export const MyImage = (image) => {
    // console.log(image);
    return (
        <div>
            <LazyLoadImage
                alt={image.alt}
                height={image.height}
                src={image.src} // use normal <img> attributes as props
                width={image.width}
                effect="blur"
            />
            <span>{image.caption}</span>
        </div>
    )
};

