**Archived Status** This is a previous experiment in the "DE CMS Migration Project" that didn't turn out well. Current work for the CMS backend is being developed at: https://github.com/CUCentralAdvancement/giving-backend

# CU Central Advancement CMS

The Central Advancement Content Management System. This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

```bash
# First, download the dependencies.
yarn

# Make environmental variable file.
cp .env.example .env.local

# Add environmental variables, usually stored in Heroku UI.
open -e .env.local

# Boot up Postgres service.
docker-compose -f local-dev-stack.yml up -d

# Prisma migrate database tables.
yarn db:migrate

# Create SSL keys.
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

# Start dev server.
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the login prompt.

## User Accounts

All routes on the app using the `AdminLayout` are protected and need authentication through Auth0.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
