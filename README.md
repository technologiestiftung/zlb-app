# ZLB Citizen Terminal

Prototype of the ZLB Citizen Terminal. The prototype uses [Eleventy](https://www.11ty.dev/) as a page builder, a pipeline for processing SCSS and a webpack setup to bundle JavaScript.

## Content

You'll find the content of the prototype in the `src/_data` directory.

The data is mapped to the Eleventy templates like so:

- `level1.json` → `categories.liquid`
- `level2.json` → `overview.liquid`
- `level3.json` → `service.liquid`

> Each of the JSON files is accompanied by a JS file that prepares the JSON for use in Eleventy (e.g. `level1array.js`).

### Updating the level3.json

#### Via scraping

The `level3.json` information can be generated from: https://github.com/technologiestiftung/berlin-service-harvester
(rename `service-output.json` to `level3.json` and replace the file)

#### Manually

For this prototype, we manually added additional data in a `level3-manual.json` file.

> The same applies to the `aemter.json` and `aemter-manual.json`.

### Map data

We currently use the `aemter.geojson` for the map view. It is created with the `utils/createAemterGeojson.js` script. So whenever, content for the ämter changes, thsi script has to be re-run.

We also use the `bezirksgrenzen.geojson` and `libraries.geojson` for the map.

### Other data files

There are some more data files in the directory that may or may not be used in the future.

## Workflow

The `master` branch (soon to be renamed to `main`) is the main branch of the project. Do **not** push directly to this branch. Instead, development should happen on dedicated feature branches:

1. Start a new branch from `master`
2. Write your code
3. Push your feature branch to the remote
4. Create a Pull Request against the `master` branch (including a brief description of your changes)
5. If all is fine, the changes can be merged into `master`

If possible, use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for an explicit commit history.

## Working on the map

In order to work on the map view, you will need to create a `.env` file in your local root directory. The file should contain a [Mapbox access token](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/) and should look like this:

```
MAPBOX_TOKEN=YOUR_ACCESS_TOKEN_HERE
```

The access token is required to load the map tiles of Mapbox.

## Available commands

### Install dependencies

```
npm install
```

### Develop

```
npm run dev
```

The site is then deployed to the `_site` folder and served locally.

### Build

```
npm run build
```

## Deployment

The prototype is currently deployed to [netlify](https://www.netlify.com/). Changes to `master` will automatically trigger a re-deploy of the site. The `create-env.js` file is needed for the netlify deployment.
