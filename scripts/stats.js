import fs from 'fs'

const counts = {
    noRatings: 0,
    noYear: 0,
    noDirector: 0,
    noActors: 0,
}

let all = JSON.parse(fs.readFileSync('./data/all.json', 'utf8'))

const filtered = all.filter(item => {
    if (!item.rating) {
        counts.noRatings++;
    }
    if (!item.year) {
        counts.noYear++;
        console.log(`${item.title} / ${item.id}`)
        return false
    }
    if (!item.director) {
        counts.noDirector++;
        console.log(`${item.title} / ${item.id}`)
        return false
    }
    if (!item.actors) {
        counts.noActors++;
        console.log(`${item.title} / ${item.id}`)
        return false
    }

    return true
});

fs.writeFileSync('./data/filtered.json', JSON.stringify(filtered), 'utf8');