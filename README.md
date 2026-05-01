This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.








## Demo Mode

This project supports a mock AI mode for safe public deployment.

- Demo mode uses a local knowledge base instead of OpenAI
- No API key required
- To enable real AI locally:
  - set `USE_MOCK_AI=false`
  - add `OPENAI_API_KEY`

## Vercel Setup

This app is ready for Vercel as a standard Next.js project. Vercel will auto-detect the framework and use:

- Install command: `npm install`
- Build command: `npm run build`
- Output: managed by Next.js

For a safe public demo deployment, add this environment variable in Vercel:

```env
USE_MOCK_AI=true
```

No OpenAI key is required in demo mode. To use real OpenAI responses in a private/local deployment, set:

```env
USE_MOCK_AI=false
OPENAI_API_KEY=your_api_key_here
```

Do not commit real API keys. Keep them in `.env.local` locally or Vercel Environment Variables in production.
