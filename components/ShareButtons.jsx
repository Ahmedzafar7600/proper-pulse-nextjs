'use client';
import React from 'react';

import { FacebookShareButton, TwitterShareButton,WhatsappShareButton,EmailShareButton,FacebookIcon,TwitterIcon,WhatsappIcon,EmailIcon } from 'react-share';

function ShareButtons({ property }) {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
   <>
   <h3 className="text-lg font-bold text-center pt-2 ">Share this property</h3>
   <div className="flex justify-center space-x-4 pb-4 ">
     <FacebookShareButton url={shareUrl} quote={property.name} hashtag={`[${property.type.replace(/\s+/g, '')}ForRent]`}>
       <FacebookIcon size={32} round />
     </FacebookShareButton>
     <TwitterShareButton url={shareUrl} quote={property.name} hashtag={`[${property.type.replace(/\s+/g, '')}ForRent]`}>
       <TwitterIcon size={32} round />
     </TwitterShareButton>
     <WhatsappShareButton url={shareUrl} quote={property.name} hashtag={`[${property.type.replace(/\s+/g, '')}ForRent]`}>
       <WhatsappIcon size={32} round />
     </WhatsappShareButton>
     <EmailShareButton url={shareUrl} quote={property.name} hashtag={`[${property.type.replace(/\s+/g, '')}ForRent]`}>
       <EmailIcon size={32} round />
     </EmailShareButton>
   </div>
   </>
  );
}

export default ShareButtons;
