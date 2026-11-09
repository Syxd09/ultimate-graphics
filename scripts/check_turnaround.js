async function checkTurnaround() {
  const res = await fetch('http://localhost:3000/');
  const html = await res.text();
  const idx = html.indexOf('bespoke signage quotes');
  console.log(html.slice(idx - 600, idx - 200));
}
checkTurnaround();
