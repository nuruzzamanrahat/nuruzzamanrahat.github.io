const githubUsername = "nuruzzamanrahat";
const gitConnectedUsername = "nuruzzamanrahat1738";
const mediumUsername = "";

// Put your LinkedIn profile image URL here
const linkedInImageURL = "https://media.licdn.com/dms/image/v2/D4E03AQE7VPf_jLkmmw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1699814740368?e=1768435200&v=beta&t=7fnNGkfueieZbwYGhFR2lEd6UGhqt23fuiFmliwW_TY";

const createGitConnectedURL = (username) => `https://gitconnected.com/v1/portfolio/${username}`;
const gitRepos = (username) => `https://pinned.berrysauce.dev/get/${username}`;
const mediumRSS = (username) => username ? `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}` : "";

export const URLs = {
    gitConnected: createGitConnectedURL(gitConnectedUsername),
    gitRepo: gitRepos(githubUsername),
    medium: mediumRSS(mediumUsername),
    linkedInImage: linkedInImageURL,
};
