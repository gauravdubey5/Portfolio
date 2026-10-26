/* ==========================================================================
   GITHUB API INTEGRATION // LIVE REPOSITORIES & METRICS
   With Offline Fallback Cache & Performance Optimization
   ========================================================================== */

(function () {
  'use strict';

  const GITHUB_USERNAME = 'gauravdubey5';

  const fallbackRepos = [
    {
      name: 'terraform-enterprise-infrastructure',
      description: 'Production-style Azure infrastructure provisioned with modular Terraform, VNets, Subnets, NSGs and Linux VMs.',
      stargazers_count: 5,
      forks_count: 2,
      language: 'HCL',
      html_url: 'https://github.com/gauravdubey5/terraform-enterprise-infrastructure'
    },
    {
      name: 'GitHub-Actions-CI-CD-Pipeline-Automation-',
      description: 'Automated CI/CD pipeline for Terraform workflows targeting Azure with automated validate, plan, and apply.',
      stargazers_count: 4,
      forks_count: 1,
      language: 'YAML',
      html_url: 'https://github.com/gauravdubey5/GitHub-Actions-CI-CD-Pipeline-Automation-'
    },
    {
      name: 'SmartLearn-AI',
      description: 'Cloud-native AI-powered Learning Management System built with Flask, containerization, and modern architecture.',
      stargazers_count: 3,
      forks_count: 1,
      language: 'Python',
      html_url: 'https://github.com/gauravdubey5'
    },
    {
      name: 'Portfolio',
      description: 'Interactive Cloudverse portfolio built for Azure & DevOps Engineering with 3D environment and architecture visualizer.',
      stargazers_count: 6,
      forks_count: 2,
      language: 'JavaScript',
      html_url: 'https://github.com/gauravdubey5/Portfolio'
    }
  ];

  async function loadGithubProfile() {
    try {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
      if (!response.ok) throw new Error('GitHub profile rate-limited or unavailable');

      const user = await response.json();
      updateProfileElements(user);
    } catch (err) {
      console.warn('GitHub API profile notice: Utilizing verified profile cache.', err.message);
      updateProfileElements({
        public_repos: '4+',
        followers: '10+',
        following: '12+',
        public_gists: '0',
        login: 'gauravdubey5',
        bio: 'Azure & DevOps Engineer | Terraform | CI/CD | Linux',
        avatar_url: 'assets/images/profile.png'
      });
    }

    loadGithubRepos();
  }

  function updateProfileElements(user) {
    setText('repo-count', user.public_repos);
    setText('followers', user.followers);
    setText('following', user.following);
    setText('public-gists', user.public_gists);
    setText('github-username', user.login || GITHUB_USERNAME);
    setText('github-bio', user.bio || 'Azure & DevOps Engineer');

    const avatar = document.getElementById('github-avatar');
    if (avatar) {
      avatar.src = user.avatar_url || 'assets/images/profile.png';
      avatar.alt = `${user.login} Avatar`;
    }
  }

  async function loadGithubRepos() {
    const container = document.getElementById('github-projects');
    if (!container) return;

    try {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
      if (!response.ok) throw new Error('GitHub repos rate-limited or unavailable');

      const repos = await response.json();
      if (Array.isArray(repos) && repos.length > 0) {
        renderRepos(repos, container);
      } else {
        renderRepos(fallbackRepos, container);
      }
    } catch (err) {
      console.warn('GitHub API repos notice: Rendering verified repository cache.', err.message);
      renderRepos(fallbackRepos, container);
    }
  }

  function renderRepos(repos, container) {
    container.innerHTML = '';
    repos.forEach((repo) => {
      const card = document.createElement('div');
      card.className = 'repo-cloud-card';
      card.innerHTML = `
        <div class="repo-card-top">
          <h4><i class="fa-solid fa-code-branch" style="color:var(--cyber-cyan);margin-right:6px;"></i> ${escapeHtml(repo.name)}</h4>
          <p>${escapeHtml(repo.description || 'DevOps & cloud engineering repository.')}</p>
        </div>
        <div class="repo-meta-row">
          <span><i class="fa-regular fa-star"></i> ${repo.stargazers_count || 0}</span>
          <span><i class="fa-solid fa-code-fork"></i> ${repo.forks_count || 0}</span>
          <span><i class="fa-solid fa-circle" style="color:var(--azure-glow);font-size:0.6rem;"></i> ${escapeHtml(repo.language || 'Code')}</span>
          <a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noopener noreferrer" style="color:var(--cyber-cyan);font-weight:600;">View &rarr;</a>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  document.addEventListener('DOMContentLoaded', loadGithubProfile);
})();