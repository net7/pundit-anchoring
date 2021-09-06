# Anchoring

The anchoring module is a Typescript rewrite of tilgovi's anchoring packages:

- [dom-anchor-fragment](https://github.com/tilgovi/dom-anchor-fragment)
- [dom-anchor-text-position](https://github.com/tilgovi/dom-anchor-text-position)
- [dom-anchor-text-quote](https://github.com/tilgovi/dom-anchor-text-quote)

The objective of this module is to provide the user with a simple API to attach web annotations to an HTML or PDF document.

## DOM Anchoring Strategies

### Fragment
The fastest anchoring strategy if there have not been made any changes to the document since it was annotated. It simply applies the "start" and "end" xpaths to the current DOM, and attaches the annotation between them.

### Text Position
This strategy is useful when *the structure of the document has changed, but the content has not*. Like changes to the HTML structure but not to the text content.
In this case we try to attach the annotation based on global character offsets. Then we verify that the matched text is the same as it was stored in the annotation's data.

### Text Quote
This is the fallback strategy for when both the context and the text content have been changed since the annotation was made.  
The search starts from the expected start position of the annotation, and tries to locate the annotation prefix string (fuzzy search). Then searches for the suffix string around the expected end offset.  
The resulting string is compared to the original annotation string and if it's within the similarity threshold a match is created.

## Development

### Pre-requirements

- Git
- NodeJS version v.12+

### Building the Anchoring Module

To build the Anchoring Module locally, clone this repository and cd into the cloned folder, run `npm install` and run `npm run build`.
This repository is meant to be used alongside the [Pundit Client App](https://github.com/net7/pundit-client), and should be installed by it.

### Importing and using the Anchoring API

```js
// Example using the text-position strategy:

import { position } from '@pundit/anchoring';

const selector = position.fromRange(root, range);
```
