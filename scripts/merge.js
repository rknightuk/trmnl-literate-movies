const fs = require('fs');

const all = []

Array.from({ length: 24 }).forEach((_, i) => {
    const data = JSON.parse(fs.readFileSync(`${i + 1}.json`, 'utf8'))

    all.push(...data)
})

fs.writeFileSync('all.json', JSON.stringify(all), 'utf8');