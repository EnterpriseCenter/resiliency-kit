This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
---

Install npm packages:

```bash
yarn
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More
---

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel
---

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Project Configuration
---

### Add Custom Types to Prismic
To get started, you can import the JSON files saved in the `types` directory as custom types in Prismic.

### Add A New Language
- Add a new language with region in Prismic. Each entry in Prismic will have a locale selector where you can add multi-language content.
- In `next.config.js`, add the new locale to the `i18n` object. [Learn more about locales in Next.js](https://nextjs.org/docs/advanced-features/i18n-routing).
- In `/lib/localeFormat.js`, follow the existing examples to add formatting for your new locale.

That's it! No need to create a new subdirectory path.

### Add Questions
- Add a question within Prismic. Make sure the Question Identifier is set; you'll use this to create a tagging system for the checklist items that will map to this question's answers.
- In the Checklist Item custom type in Prismic, go to the Filters tab and add a new Group field with an API ID that matches the Question Identifier.
- Add a relationship field inside that group called Answer. Add the following constraints: Select Custom Type: Answer; Select tags: Sector