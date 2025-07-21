copy(Array.from(document.querySelectorAll('.list-detailed-entry')).map(e => {
    const data = e.querySelector('.poster').dataset
    return {
        id: data.filmId,
        link: e.querySelector('.name a').href,
        title: e.querySelector('.name a').textContent,
        poster: data.posterUrl,
        poster2: e.querySelector('.poster .image').src,
        year: e.querySelector('.releasedate') ? e.querySelector('.releasedate a').textContent : null,
        rating: e.querySelector('.rating') ? Array.from(e.querySelector('.rating').classList).find(c => c.startsWith('rated-'))?.replace('rated-', '') : null,
        desc: e.querySelector('.body-text').innerHTML.trim(),
    }
}))