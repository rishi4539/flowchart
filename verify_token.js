import fetch from 'node-fetch';

const token = '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';

fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${token}` }
})
    .then(res => res.json())
    .then(data => {
        console.log('Status:', data.message || 'OK');
        console.log('User:', data.login);
    })
    .catch(err => console.error(err));
