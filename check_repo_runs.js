import fetch from 'node-fetch';
const token = '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';
fetch('https://api.github.com/repos/rishi4539/workflows/actions/runs', { headers: { Authorization: `Bearer ${token}` } })
    .then(r => r.json())
    .then(d => console.log('Runs:', d.total_count))
    .catch(e => console.error(e));
