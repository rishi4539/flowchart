import fetch from 'node-fetch';
const token = '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';
fetch('https://api.github.com/user/repos?sort=updated&per_page=10', { headers: { Authorization: `Bearer ${token}` } })
    .then(r => r.json())
    .then(repos => repos.forEach(r => console.log(r.full_name)))
    .catch(e => console.error(e));
