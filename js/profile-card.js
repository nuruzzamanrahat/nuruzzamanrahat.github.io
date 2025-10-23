import { html, render } from "https://unpkg.com/lit@latest?module";

async function get(url) {
  const resp = await fetch(url);
  return resp.json();
}

function githubCardTemplate(user) {
  const { avatar_url, public_repos, followers, html_url, following } = user;

  return html`
    <a href="${html_url}" target="_blank" class="profile-card">
      <div class="profile-header">
        <img class="profile-avatar" src="${avatar_url}" alt="GitHub avatar" />
        <div>
          <div class="profile-badge badge-github">GitHub</div>
          <p class="profile-url">${html_url}</p>
        </div>
      </div>
      <div class="profile-stats">
        ${[
          { label: "REPOSITORIES", value: public_repos },
          { label: "FOLLOWERS", value: followers },
          { label: "FOLLOWING", value: following },
        ].map(
          (stat) => html`
            <div>
              <p class="stat-label">${stat.label}</p>
              <p class="stat-value">${stat.value}</p>
            </div>
          `
        )}
      </div>
    </a>
  `;
}

function codeforcesCardTemplate(data) {
  const { handle, rating, maxRating, avatar } = data;
  
  // Fetch problems solved count separately
  const cfUrl = `https://codeforces.com/profile/${handle}`;

  return html`
    <a href="${cfUrl}" target="_blank" class="profile-card">
      <div class="profile-header">
        <img
          class="profile-avatar"
          src="${avatar || 'https://cdn.iconscout.com/icon/free/png-512/free-codeforces-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-4-pack-logos-icons-2944796.png'}"
          alt="Codeforces avatar"
        />
        <div>
          <div class="profile-badge badge-codeforces">Codeforces</div>
          <p class="profile-url">${cfUrl}</p>
        </div>
      </div>
      <div class="profile-stats">
        ${[
          { label: "HANDLE", value: handle },
          { label: "RATING", value: rating || "Unrated" },
          { label: "MAX RATING", value: maxRating || "N/A" },
        ].map(
          (stat) => html`
            <div>
              <p class="stat-label">${stat.label}</p>
              <p class="stat-value">${stat.value}</p>
            </div>
          `
        )}
      </div>
    </a>
  `;
}

window.addEventListener("DOMContentLoaded", async () => {
  document.querySelectorAll(".github-card").forEach(async (el) => {
    const username = el.getAttribute("username");
    const data = await get(`https://api.github.com/users/${username}`);
    render(githubCardTemplate(data), el);
  });

  document.querySelectorAll(".codeforces-card").forEach(async (el) => {
    const username = el.getAttribute("username");
    try {
      const data = await get(
        `https://codeforces.com/api/user.info?handles=${username}`
      );
      if (data.status === "OK" && data.result && data.result.length > 0) {
        render(codeforcesCardTemplate(data.result[0]), el);
      } else {
        el.innerHTML = "<p>Unable to load Codeforces profile</p>";
      }
    } catch (error) {
      console.error("Error fetching Codeforces data:", error);
      el.innerHTML = "<p>Error loading Codeforces profile</p>";
    }
  });
});
