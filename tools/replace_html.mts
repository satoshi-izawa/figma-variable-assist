import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.join(`${fileURLToPath(import.meta.url)}/../..`);
const distPath = `${__dirname}/dist`;
const exp = /<script src="([^"]*)" \/>/;

const files = fs.readdirSync(`${distPath}/html`);
files.forEach(file => {
  const htmlPath = `${distPath}/html/${file}`;
  const html = fs.readFileSync(htmlPath).toString();
  const replacedHtml = html.replace(exp, script => {
    const jsPath = exp.exec(script)?.[1];
    if (!jsPath) {
      throw new Error('pathが見つかりません');
    }
    const js = fs.readFileSync(`${distPath}/${jsPath}`).toString();
    return `<script>\n${js}</script>`;
  });
  fs.writeFileSync(htmlPath, replacedHtml);
});
