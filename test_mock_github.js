import fetch from 'node-fetch';

async function testMockFlow() {
    // 1. Register/Login
    const loginRes = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'mocktester', email: 'mock@test.com', password: 'password' })
    });
    const loginData = await loginRes.json();
    const token = loginData.token;
    const userId = loginData.user.id;
    console.log('User ID:', userId);

    // 2. Trigger Mock Callback
    const callbackRes = await fetch('http://localhost:5000/api/auth/github/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: 'MOCK_GITHUB_CODE', userId })
    });
    const callbackData = await callbackRes.json();
    console.log('Callback Result:', callbackData);

    // 3. Fetch Repos
    const repoRes = await fetch('http://localhost:5000/api/github/repos', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const repos = await repoRes.json();
    console.log('Repos:', repos);
}

testMockFlow();
