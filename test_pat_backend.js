import fetch from 'node-fetch';

async function testBackend() {
    // 1. Register a user
    const regRes = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'debuguser', email: 'debug@test.com', password: 'password' })
    });
    const regData = await regRes.json();
    const userId = regData.user?.id;

    if (!userId) {
        // Try login if exists
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'debug@test.com', password: 'password' })
        });
        const loginData = await loginRes.json();
        if (!loginData.user) {
            console.log('Failed to get user');
            return;
        }
        console.log('Logged in as:', loginData.user.id);
        testToken(loginData.user.id);
    } else {
        console.log('Registered:', userId);
        testToken(userId);
    }
}

async function testToken(userId) {
    const token = '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';
    const res = await fetch('http://localhost:5000/api/auth/github/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, userId })
    });
    const data = await res.json();
    console.log('PAT Connect Result:', data);
}

testBackend();
