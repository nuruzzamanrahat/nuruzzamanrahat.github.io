const githubUsername = "nuruzzamanrahat";
const gitConnectedUsername = "nuruzzamanrahat";
const mediumUsername = "";

const createGitConnectedURL = (username) => `https://gitconnected.com/v1/portfolio/${username}`;
const gitRepos = (username) => `https://pinned.berrysauce.dev/get/${username}`;
const mediumRSS = (username) => username ? `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}` : "";

export const URLs = {
    gitConnected: createGitConnectedURL(gitConnectedUsername),
    gitRepo: gitRepos(githubUsername),
    medium: mediumRSS(mediumUsername),
};
