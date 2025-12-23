import fetch from 'node-fetch';

const payload = {
    workflow_run: {
        id: 888888,
        head_branch: "simulation-branch",
        event: "push",
        status: "in_progress",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    repository: {
        name: "simulated-repo"
    }
};

fetch('http://localhost:5000/api/webhooks/github', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-GitHub-Event': 'workflow_run'
    },
    body: JSON.stringify(payload)
})
    .then(res => res.text())
    .then(text => console.log('Response:', text))
    .catch(err => console.error('Error:', err));
