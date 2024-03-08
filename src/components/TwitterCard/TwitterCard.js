import React from "react";
import { Helmet } from "react-helmet";

const TwitterCard = ({ title, description, imageUrl }) => (
  <Helmet>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@YourTwitterHandle" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={imageUrl} />
  </Helmet>
);

export default TwitterCard;
