async function testAdminApis() {
  const apis = [
    '/api/admin/submissions',
    '/api/admin/works',
    '/api/admin/blog',
    '/api/admin/media'
  ];

  for (const api of apis) {
    try {
      const res = await fetch('http://localhost:3000' + api);
      const data = await res.json();
      console.log(`${api} -> Status ${res.status}, items: ${Array.isArray(data) ? data.length : (data.items ? data.items.length : (data.submissions ? data.submissions.length : 'ok'))}`);
    } catch (err) {
      console.error(`${api} -> ERROR: ${err.message}`);
    }
  }
}

testAdminApis();

