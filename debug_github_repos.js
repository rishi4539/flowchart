import fetch from 'node-fetch';

const token = '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';

async function debugRepos() {
    console.log('Fetching top 10 repos...');
    try {
        const res = await fetch('https://api.github.com/user/repos?sort=updated&per_page=10', {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) {
            console.error('Failed to fetch repos:', res.status, res.statusText);
            const body = await res.text();
            console.error(body);
            return;
        }

        const repos = await res.json();
        console.log(`Found ${repos.length} repos.`);

        for (const repo of repos) {
            console.log(`\nChecking Repo: ${repo.full_name} (Updated: ${repo.updated_at})`);

            const runsRes = await fetch(`https://api.github.com/repos/${repo.full_name}/actions/runs?per_page=3`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (runsRes.ok) {
                const runsData = await runsRes.json();
                console.log(`  - Workflow Runs: ${runsData.total_count}`);
                if (runsData.workflow_runs.length > 0) {
                    runsData.workflow_runs.forEach(run => {
                        console.log(`    - Run ${run.id}: ${run.name} (${run.status})`);
                    });
                }
            } else {
                console.log(`  - Failed to fetch runs: ${runsRes.status}`);
            }
        }

    } catch (err) {
        console.error('Error:', err);
    }
}

debugRepos();
