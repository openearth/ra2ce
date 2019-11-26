# RA2CE

[RA2CE](https://ra2ce.netlify.com) helps users to visualize the best ratio of societal/operator costs on infrastructure.

```
[![Netlify Status](https://api.netlify.com/api/v1/badges/1535c4c2-d3d3-496e-b404-38e41899efea/deploy-status)](https://app.netlify.com/sites/modest-allen-8e57cd/deploys)
```

## Development

The projects stack is comprised of:
* [Vue](https://vuejs.org/) as application framework
* [Vue Router](https://router.vuejs.org/) for routing
* [Vuex](https://vuex.vuejs.org/) for state management
* [Vuetify](https://vuetifyjs.com/) for styling
* [Mapbox](https://www.mapbox.com/) as the map solution
* [vue2mapbox-gl](https://www.npmjs.com/package/vue2mapbox-gl) as a Vue wrapper for Mapbox

### Getting started

* Clone the repository.
* Copy `.env.example` to `.env` and set the environment variables. Copy them from the [Netlify build configuration](https://app.netlify.com/sites/ra2ce/settings/deploys#environment-variables) or ask your tech lead.
* Run app in development mode (`npm start`), see [scripts](#scripts).
* Changes on master trigger a new build and deploy to the [live environment](https://ra2ce.netlify.com).
