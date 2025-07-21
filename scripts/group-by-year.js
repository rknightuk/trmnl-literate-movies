import fs from 'fs'

let years = {}

let all = JSON.parse(fs.readFileSync('./data/filtered.json', 'utf8'))

all.forEach(item => {
    const year = item.year.slice(0, 3) + '0'
    if (!years[year]) {
        years[year] = []
    }
    delete item.poster2
    delete item.done
    item.link = item.link.replace('https://letterboxd.com/', '')
    item.poster = item.poster ? item.poster.split('?v=')[0] : null
    item.desc = item.desc.replace('This is based on', 'Based on')
    years[year].push(item);
});

Object.keys(years).forEach(year => {
    console.log(`${year}: ${years[year].length} items`)
});

years = {
    movies: years,
}

fs.writeFileSync('./data/decades.json', JSON.stringify(Object.keys(years), null, 2), 'utf8')
fs.writeFileSync('./data/grouped.json', JSON.stringify(years), 'utf8')