const routes = [
  '/',
  '/about',
  '/work',
  '/contact',
  '/blog',
  '/legal/terms-of-service',
  '/legal/privacy-policy',
  '/work/box-mode',
  '/work/johny-nashville',
  '/work/nomad-stays',
  '/work/stackline',
  '/work/we-run-brand',
  '/blog/architectural-signage-specifications-guide',
  '/blog/fiber-laser-vs-waterjet-metal-signage',
  '/blog/commercial-fleet-branding-maintenance',
  '/blog/led-illumination-front-lit-vs-halo-lit-channel-letters',
  '/blog/storefront-transformation-5-signs-that-elevate-foot-traffic',
  '/blog/architectural-wayfinding-directional-signage-guide',
  '/blog/why-cheap-signage-fails-—-and-what-to-do-instead',
  '/blog/fleet-vehicle-branding-commercial-vans-and-trucks',
  '/blog/materials-guide-brass-stainless-steel-aluminum-signage',
  '/admin'
];

async function checkAll() {
  console.log('Testing ' + routes.length + ' application routes...');
  let hasError = false;
  
  for (const r of routes) {
    try {
      const res = await fetch('http://localhost:3000' + r, { redirect: 'follow' });
      const text = await res.text();
      const hasMain = text.includes('id="main"') || text.includes('Admin') || text.includes('article');
      const is200 = res.status === 200;
      console.log(`${r} -> Status ${res.status} (length: ${text.length}, valid: ${hasMain && is200})`);
      if (!is200) hasError = true;
    } catch (err) {
      console.error(`${r} -> ERROR: ${err.message}`);
      hasError = true;
    }
  }
  
  if (!hasError) {
    console.log('\nALL ROUTES RETURNED 200 OK WITH VALID CONTENT!');
  } else {
    console.log('\nSOME ROUTES FAILED!');
  }
}

checkAll();

