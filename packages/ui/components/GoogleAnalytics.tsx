'use client';

import Script from 'next/script';
import { adsConfig } from '../lib/config';

interface GoogleAnalyticsProps {
  measurementId?: string;
}

export default function GoogleAnalytics({ 
  measurementId = adsConfig.ga4MeasurementId 
}: GoogleAnalyticsProps) {
  if (!adsConfig.enableAnalytics || measurementId === 'G-XXXXXXXXXX') {
    if (adsConfig.debugMode) {
      console.log('Google Analytics disabled or not configured');
    }
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true,
              // Enhanced ecommerce for AdSense tracking
              custom_map: {
                'custom_parameter_1': 'ad_click',
                'custom_parameter_2': 'ad_impression'
              }
            });
          `
        }}
      />
    </>
  );
} 