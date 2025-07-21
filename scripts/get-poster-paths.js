const fs = require('fs');

let errorcount = 0;
const all = JSON.parse(fs.readFileSync('all.json', 'utf8')).map(e => {
    // const path = 'https://a.ltrbxd.com/resized/alternative-poster/5/1/5/6/8/p/R4ZZJLJp1TkxZxZzZY8Kuiet7v-0-70-0-105-crop.jpg?v=9ca3e07fdf'
    try {
        const path = e.poster2;
        let [first, second] = path.split('/p/')
        first.replace('alternative-poster', 'film-poster')
        let secondparts = second.split('-0')
        secondparts[0] = `${e.id}-${e.link.split('/')[2]}`
        secondparts[2] = '-0' + secondparts[2]
        
        const secondj = secondparts.join('')
        const fixed = (first.replace('alternative', 'film') + '/' + secondj).replace('70-0-105', '230-0-345')
        
        return {
            ...e,
            poster_fixed: fixed,
        }
    } catch (err) {
        console.log('Error processing poster for:', e.title, e.poster2);
        errorcount++
        return {
            ...e,
            poster_fixed: e.poster2,
        }
    }
});

console.log(errorcount, 'errors found in poster paths');

fs.writeFileSync('all-fixed.json', JSON.stringify(all), 'utf8');