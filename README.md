# Matheus Leão — Personal Portfolio

A bilingual React portfolio powered by Vite.

## Preview locally

Install dependencies, then start the development server:

```sh
npm install
npm start
```

Open the local URL printed by Vite.

## Update the content

Edit `src/content.js` to update experience, teaching and mentoring, education, impact metrics, services, toolkit entries, and blog posts. Keep each article in the language it was written by adding it to that language's `blog` array (`en` or `pt`). A post needs a `title`, `description`, `url`, and `language`; `date` is optional.

Edit `src/copy.js` to update navigation, page labels, and other translated interface copy. Add a matching key to both the English and Portuguese dictionaries.

Replace `public/images/profile-photo.jpg` to update the profile photo used in the header and footer.

The contact form opens a prefilled email draft addressed to `matsouzaleao@gmail.com`. It does not send messages from a server.
