async function verify() {
  const res = await fetch('http://localhost:3000/');
  console.log('Homepage status:', res.status);
  const html = await res.text();
  console.log('HTML length:', html.length);
  console.log('Contains id="main":', html.includes('id="main"'));
  console.log('Contains id="svg-templates":', html.includes('id="svg-templates"'));
  console.log('Contains 4.6+ review:', html.includes('4.6'));
  console.log('Contains 2HR quote turnaround:', html.includes('2HR'));
  console.log('Contains 2800+ projects:', html.includes('2800+'));
  console.log('Contains 65+ industries:', html.includes('65'));
  console.log('Contains Prestige facade:', html.includes('prestige') || html.includes('Prestige'));
}
verify();

