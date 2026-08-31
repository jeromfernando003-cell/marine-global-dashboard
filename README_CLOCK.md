World Clock component

Files added to the repository:
- components/WorldClock.tsx       (React + TypeScript component)
- styles/WorldClock.module.css    (CSS module used by the component)
- pages/clock.tsx                 (Next.js page that mounts the component)

How to use
1) This repository currently contains only the clock component files. To run them you need a Next.js project (TypeScript recommended).

2) If you already have a Next.js project in this repo, place the files above in the same paths and start the dev server:
   - npm install
   - npm run dev
   Then open http://localhost:3000/clock

3) If you DO NOT have a Next.js project yet and want me to scaffold the full site (Next.js project, package.json, tooling, and the other pages mentioned in the project plan), reply "Scaffold full Next.js app" and I will create the necessary project files and push them.

Notes
- The component uses the browser Intl API. Add valid IANA time zone names (e.g., "America/New_York") when adding custom zones.
- Timezones selected by the user are saved in localStorage.

Would you like me to scaffold the full Next.js app now and wire this page into it? If yes, reply "Scaffold full Next.js app" and I'll push the full project so you can run the site immediately.
