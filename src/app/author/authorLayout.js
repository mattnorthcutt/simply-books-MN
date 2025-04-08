import { Inter } from 'next/font/google';
import PropTypes from 'prop-types';
import ClientProvider from '@/utils/context/ClientProvider';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });
export default function RootLayout1({ children1 }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>{children1}</ClientProvider>
      </body>
    </html>
  );
}

RootLayout1.propTypes = {
  children1: PropTypes.node.isRequired,
};

// You can manage the metadata, tab content and info about your app dynamically using this. It will work on every page in your app:
export const generateMetadata = async ({ params }) => {
  // Destructure parameters or fetch necessary data here
  const { slug1 } = params; // Example of accessing dynamic route params

  return {
    title: `Simply Books - ${slug1 || 'Authors'}`, // Dynamically set the title using route parameters
    description: `This is a dynamically generated description for ${slug1}.`, // Dynamic description
    // Add other metadata fields as needed, like keywords, open graph tags, etc.
    keywords: [`${slug1}`, 'dynamic', 'page'],
    openGraph: {
      title: `Open Graph Title for ${slug1}`,
      description: `Open Graph Description for ${slug1}`,
      url: `https://yourwebsite.com/${slug1}`,
    },
  };
};
