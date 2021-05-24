import fs from 'fs';
import fg from 'fast-glob';
import { create } from 'xmlbuilder2';
import pkg from './package.json';

const buildFolder = './vercel_build_output/static'

const getUrl = (url) => {
    if(!url) {return 'no url passed to function'}
    const trimmed = url.slice(6).replace('index.html', '');
    return `${pkg.url}/${trimmed}`;
};

async function createSitemap() {
    const sitemap = create({ version: '1.0' }).ele('urlset', {
        xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
    });

    const pages = await fg([`${buildFolder}/**/*.html`]);

    if(!pages) { return 'pages not found' }

    pages.forEach((page) => {
        const url = sitemap.ele('url');
        url.ele('loc').txt(getUrl(page));
        url.ele('changefreq').txt('weekly');
    });

    const xml = sitemap.end({ prettyPrint: true });

    fs.writeFileSync(`${buildFolder}/sitemap.xml`, xml);
}

createSitemap();