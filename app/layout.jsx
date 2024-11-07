import React from 'react';
import '@/assets/styles/globals.css'


export const metaData={
    title:'Property Pulse',
    keyword:'rental, property , realestate ',
    description:'Find the perfect rental property',
}

export default function MainLayout({children}) {
  return (
  <html>
    <body>
        <main>
            {children}
        </main>
    </body>
  </html>
  );
}
