import fs from 'fs'

import { DOMParser, parseHTML } from 'linkedom'

let errorcount = 0;
let all = JSON.parse(fs.readFileSync('all.json', 'utf8'))

const fetchPageHtml = async (link) => {
    const domain = new URL(link).origin
    const page = await fetch(link)
    const html = await page.text()

    const { document } = parseHTML(html)

    return document
}

for (let i = 0; i < all.length; i++) {
    let item = all[i];
    if (!item.done) {
        console.log(`Running for ${item.title} (${i + 1}/${all.length})`)
    } else {
        console.log(`Skipping ${item.title} (${i + 1}/${all.length})`)
        continue
    }

    const document = await fetchPageHtml(item.link)

    const movieData = JSON.parse(document.querySelector('script[type="application/ld+json"]').innerText.replace('/* <![CDATA[ */', '').replace('/* ]]> */', '').trim())

    const newData = {
        poster: movieData.image,
        director: (movieData.director || []).map(d => d.name).join(', '),
        actors: (movieData.actors || []).slice(0, 5).map(d => d.name).join(', '),
    }

    all[i] = {
        done: true,
        ...item,
        ...newData
    }

    fs.writeFileSync('all.json', JSON.stringify(all))

    await new Promise(resolve => setTimeout(resolve, 500));
}