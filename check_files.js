import fetch from 'node-fetch';
const token = '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';
fetch('https://api.github.com/repos/rishi4539/workflows/contents/.github/workflows', { headers: { Authorization: `Bearer ${token}` } })
    .then(r => {
        if (r.status === 404) console.log('Folder not found');
        else return r.json().then(files => console.log('Files:', files.map(f => f.name)));
    })
    .catch(e => console.error(e));
