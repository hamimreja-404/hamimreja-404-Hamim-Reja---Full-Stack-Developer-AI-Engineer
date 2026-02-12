import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, url }) {
  const siteUrl = "https://hamimreja.in"; 
  const defaultTitle = "Hamim Reja | Full-Stack Developer & ECE Engineer";
  const defaultDesc = "Portfolio of Hamim Reja, a Full-Stack Developer (MERN) and ECE Engineer from Aliah University.";
  const defaultImage = "https://res.cloudinary.com/dm01lhkax/image/upload/v1770918643/HamimReja_vmphrh.jpg";

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title ? `${title} | Hamim Reja` : defaultTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <link rel="canonical" href={url ? `${siteUrl}${url}` : siteUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:url" content={url ? `${siteUrl}${url}` : siteUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={defaultImage} />
    </Helmet>
  );
}