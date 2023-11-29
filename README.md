## Foodie Blog

<p>This SvelteKit application is a unique platform for saving and rating recipes. It combines a MongoDB backend with SvelteKit form actions for recipe management, and features an AI-powered chatbot assistant using OpenAI's API. Authjs is integrated for secure and efficient user authentication.</p>

<p>In a world where recipe websites are more cluttered than a spice drawer, my quest for a simple chicken noodle soup recipe led me to create this web app. Because let's face it, we're here to cook, not to scroll through popup ads and a needless life-story just for SEO and a word-count quota (that does nothing but cause pain for the user).</p>

## How It's Made:

**Tech used:**

SvelteKit, TypeScript, MongoDB, Superforms/Zod, Authjs

## Install the dependencies either using NPM/Yarn/PNPM:

Using PNPM:

```bash
# Install dependencies
$ pnpm i

# Start development server
$ pnpm run dev
```

Open http://127.0.0.1:5173/ to view it in the browser.

## Things to add:

- Create a `.env` file and add the following:
  - DB_URI=(your MongoDB connection string)
    -AUTH_SECRET=(your Authjs secret string)
    -GITHUB_ID=(your GitHub ID)
    -GITHUB_SECRET=(your GitHub secret key)
    -OPENAI_KEY=(your OpenAI key)

## Lessons Learned:

- Better understanding of SvelteKit and route-based endpoints
- Better understanding of incorporating OpenAI APIs
- Checking authentication using +page.server.ts/+layout.server.ts files

## Optimizations:

- TBD
