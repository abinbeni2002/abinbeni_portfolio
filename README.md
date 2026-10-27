# N S Abin Beni | Backend Developer Portfolio

A responsive, modern-dark React portfolio built with Vite. Designed for static hosting on Cloudflare Pages.

## Included

- Responsive hero, about, experience, projects, skills, and contact sections
- Project cards for FaceNest and ClearMind
- Contact links sourced from `src/data.js`
- Empty project repository/live-demo URLs until you add the real URLs
- No backend, paid service, or environment variables required

## 1. Prerequisites

Install Node.js (current LTS) from https://nodejs.org/ and Git if you want to publish from GitHub.

## 2. Run locally

From this folder:

```bash
npm install
npm run dev
```

Open the local URL Vite prints in your terminal.

## 3. Personalize before publishing

Edit `src/data.js`:

- Change `profile.name` and `profile.initials`.
- Verify the GitHub and LinkedIn URLs.
- Add a public email only if you want it displayed.
- Add a PDF resume at `public/resume.pdf` and set `resumeUrl: "/resume.pdf"`, or use a real public PDF URL.
- Add the actual public `repo` and `live` URLs for each project when available.
- Review the TCS experience bullets and project summaries for accuracy before publishing.

The page intentionally does not invent email addresses, project repositories, deployment links, metrics, or unverified achievements.

## 4. Build and test

```bash
npm run build
npm run preview
```

Vite outputs the production site into `dist/`. Check the site at mobile and desktop widths before publishing.

## 5. Deploy free with Cloudflare Pages

### Option A — Connect a GitHub repository (recommended)

1. Create a new GitHub repository, for example `backend-portfolio`.
2. Push this project to that repository:

   ```bash
   git init
   git add .
   git commit -m "Build developer portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/backend-portfolio.git
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` and the repository URL with your real values.

3. Sign in to https://dash.cloudflare.com/.
4. Open **Workers & Pages** and choose to create a Pages project connected to Git.
5. Select your repository and configure:
   - Framework preset: **Vite** (or **None** if Vite is not listed)
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Deploy. Cloudflare will provide a `*.pages.dev` address after a successful deployment.
7. Push future changes to the connected branch to trigger a new build.

### Option B — Direct upload

1. Run `npm install` and `npm run build` locally.
2. In Cloudflare Pages, create a project using the direct-upload option if available for your account.
3. Upload the generated `dist/` directory as instructed in the dashboard.

Direct-upload projects have different redeployment workflows from Git-connected projects. For a portfolio you expect to update, Git integration is usually easier.

## Troubleshooting

- **Build fails:** check the Cloudflare build log and confirm `npm run build` succeeds locally.
- **Blank page:** verify the browser console and that the deploy output directory is `dist`.
- **Links not shown:** add a real non-empty URL to the relevant field in `src/data.js`.
- **Resume link:** make sure the file is in `public/` before building; Vite copies public files to the output.

## Stack

React · Vite · Lucide icons · CSS · Cloudflare Pages
