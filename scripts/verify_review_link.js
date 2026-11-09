const fs = require('fs');

fetch('http://localhost:3000/')
  .then(res => res.text())
  .then(html => {
    console.log('--- HOMEPAGE VERIFICATION ---');
    console.log('Contains Google Review URL:', html.includes('https://g.page/r/CWCJQgHfoJUPEAE/review'));
    console.log('Contains trustpilot.com:', html.includes('trustpilot.com'));
    
    const reviewIdx = html.indexOf('Average client rating on Google');
    if (reviewIdx !== -1) {
      console.log('\n--- Review Section Snippet (around rating):');
      console.log(html.slice(reviewIdx, reviewIdx + 1100));
    } else {
      console.log('Review section text not found');
    }
    
    console.log('\n--- Link Button Check:');
    const linkIdx = html.indexOf('Our Reviews');
    if (linkIdx !== -1) {
      console.log(html.slice(linkIdx - 200, linkIdx + 200));
    }
  })
  .catch(err => console.error('Fetch error:', err));

