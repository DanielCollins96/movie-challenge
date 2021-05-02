This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Description

This is an app to help manage our movie nominations for the upcoming Shoppies. It's a webpage that can search [OMDB](http://www.omdbapi.com/) for movies, and allow the user to save their favourite films they feel should be up for nomination. When they've selected 5 nominees they should be notified they're finished.

## Technical Todos

- [x] Search results should come from OMDB's API.
- [x] Each search result should list at least its title, year of release and a button to nominate that film.
- [x] Updates to the search terms should update the result list.
- [ ] Movies in search results can be added and removed from the nomination list.
- [ ] If a search result has already been nominated, disable its nominate button.
- [ ] Display a banner when the user has 5 nominations.
