import Fuse from 'fuse.js';

import politicalCardData from '../data/political-cards.json';

const fuse = new Fuse(politicalCardData, {
  keys: [
    {
      name: 'title',
      weight: 0.7
    },
    {
      name: 'elect',
      weight: 0.1
    },
    {
      name: 'resolution.for',
      weight: 0.1
    },
    {
      name: 'resolution.against',
      weight: 0.1
    }
  ]
});

export default search => fuse.search(search);
