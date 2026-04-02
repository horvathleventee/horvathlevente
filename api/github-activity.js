const githubUsername = "horvathleventee";
const githubApiBase = "https://api.github.com";
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "horvathlevente-portfolio"
};

if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

function mapCommit(repo, commit) {
  return {
    repo: repo.name,
    message: commit.commit?.message || "Commit",
    url: commit.html_url,
    createdAt:
      commit.commit?.author?.date ||
      commit.commit?.committer?.date ||
      repo.pushed_at ||
      new Date().toISOString()
  };
}

async function fetchJson(url) {
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`GitHub API ${response.status}`);
  }

  return response.json();
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  try {
    const [profile, repos] = await Promise.all([
      fetchJson(`${githubApiBase}/users/${githubUsername}`),
      fetchJson(`${githubApiBase}/users/${githubUsername}/repos?per_page=100&sort=pushed`)
    ]);

    const publicRepos = repos.filter(
      (repo) => !repo.fork && repo.owner?.login?.toLowerCase() === githubUsername.toLowerCase()
    );

    const commitLists = await Promise.all(
      publicRepos.map(async (repo) => {
        try {
          const commits = await fetchJson(
            `${githubApiBase}/repos/${repo.owner.login}/${repo.name}/commits?per_page=3`
          );
          return commits.map((commit) => mapCommit(repo, commit));
        } catch (error) {
          return [];
        }
      })
    );

    const commits = commitLists
      .flat()
      .filter((commit) => commit && commit.createdAt)
      .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt))
      .slice(0, 7);

    res.status(200).end(
      JSON.stringify({
        repos: publicRepos.length || profile.public_repos || 0,
        followers: profile.followers || 0,
        commits
      })
    );
  } catch (error) {
    res.status(500).end(
      JSON.stringify({
        error: "GitHub activity unavailable"
      })
    );
  }
};
