import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, url }) {
  const siteUrl = "https://hamimreja.in/";
  const defaultTitle = "Hamim Reja | Full-Stack Software Engineer & Systems Architect";
  const defaultDesc = "Portfolio of Hamim Reja — Full-Stack Software Engineer (SDE), Backend Systems Architect, and Startup Builder specializing in React, Next.js, Node.js, TypeScript, Distributed Systems, WebRTC, and Scalable Cloud Architectures.";
  const defaultImage = "https://hamimreja.in/HeroSection.webp";

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title ? `${title} | Hamim Reja` : defaultTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <link rel="canonical" href={url ? `${siteUrl}${url}` : siteUrl} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content="profile" />
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
