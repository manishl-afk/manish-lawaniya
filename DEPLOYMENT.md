# Deployment Guide — GitHub Pages

This site is plain static HTML/CSS/JS, which is exactly what GitHub Pages serves
natively — no build step required.

This is a **brand-new, separate repository** from your existing `My-Portfolio`
repo/site. The old one is untouched — this deploys alongside it as its own project.

See the step-by-step walkthrough in the chat response for the full process:
create the new repo, upload these files, enable Pages, and verify the live site.

Quick reference:
- New repo: manishl-afk/manish-lawaniya
- Branch: main
- Root files required: index.html, about.html, portfolio.html, services.html,
  blog.html, contact.html, privacy.html, terms.html, robots.txt, sitemap.xml,
  and the assets/ folder (css, js, images)
- Live URL after deploy: https://manishl-afk.github.io/manish-lawaniya/
- Old site (unaffected): https://manishl-afk.github.io/My-Portfolio/

## Updating the site later
1. Edit the relevant .html / .css / .js file
2. Commit and push to the same branch GitHub Pages is serving
3. GitHub rebuilds automatically — changes are usually live within 1-2 minutes
