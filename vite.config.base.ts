// This file is used to configure the base path for GitHub Pages deployment
// If you're deploying to https://username.github.io/travel-magazine-blog/
// Set base to '/travel-magazine-blog/'
// If you're deploying to a custom domain, set base to '/'

export const getBase = () => {
  // Check if we're in a GitHub Pages environment
  const isGitHubPages = process.env.GITHUB_PAGES === "true";
  
  // Get the repository name from environment or use default
  const repoName = process.env.VITE_REPO_NAME || "travel-magazine-blog";
  
  // For GitHub Pages, use /{repoName}/ unless it's the user/org page
  if (isGitHubPages) {
    return `/${repoName}/`;
  }
  
  // For local development or custom domains, use /
  return "/";
};

export default getBase();

