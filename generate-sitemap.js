// generate-sitemap.js
const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');

// Define your base URL
const BASE_URL = 'https://www.3skici.com'; 

// List of static routes
const staticRoutes = [
  '/',
  '/about',
  '/contact',
  '/products',
  // Add other static routes here
];

// Function to fetch dynamic routes (e.g., from an API or database)
const fetchDynamicRoutes = async () => {
  // Example: Fetch product IDs from an API
  // Replace this with your actual data fetching logic
  // For demonstration, we'll use mock data
  return [
    '/products/1',
    '/products/2',
    '/products/3',
    // Add more dynamic routes as needed
  ];
};

const generateSitemap = async () => {
  const dynamicRoutes = await fetchDynamicRoutes();
  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const sitemap = new SitemapStream({ hostname: BASE_URL });

  allRoutes.forEach(route => {
    sitemap.write({ url: route, changefreq: 'daily', priority: 0.8 });
  });

  sitemap.end();

  const sitemapData = await streamToPromise(sitemap).then(sm => sm.toString());

  fs.writeFileSync(path.resolve(__dirname, 'public', 'sitemap.xml'), sitemapData);
  console.log('Sitemap generated successfully!');
};

generateSitemap().catch(error => {
  console.error('Error generating sitemap:', error);
});
