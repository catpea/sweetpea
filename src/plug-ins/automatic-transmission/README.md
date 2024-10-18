## Usage

```JavaScript

import AutomaticTransmission from './AutomaticTransmission.js';

const gearbox = {
  '/idle':{
    enter: () => console.log('Holla from /idle'),
    exit: () => console.log('K, bye from /idle'),
  },
  '/connected':{
    enter: () => console.log('Holla from /connected'),
    exit: () => console.log('K, bye from /connected'),
  },
  '/connected/front': {
    enter: () => console.log('Holla from /connected/front'),
    exit: () => console.log('K, bye from /connected/front'),
  },
  '/connected/front/danger': {
    enter: () => console.log('Holla from /connected/front/danger'),
    exit: () => console.log('K, bye from /connected/front/danger'),
  },
  '/connected/settings': {
    enter: () => console.log('Holla from /connected/settings'),
    exit: () => console.log('K, bye from /connected/settings'),
  },
  '/connected/worker': {
    enter: () => console.log('Holla from /connected/worker'),
    exit: () => console.log('K, bye from /connected/worker'),
  },
  '/disconnected':{
    enter: () => console.log('Holla from /disconnected'),
    exit: () => console.log('K, bye from /disconnected'),
  },
  '/error':{
    enter: () => console.log('Holla from /error'),
    exit: () => console.log('K, bye from /error'),
  },
}
const transmission = new AutomaticTransmission(gearbox, '/idle');

transmission.shift('/connected/front');
transmission.shift('/connected/front/danger');
transmission.shift('/disconnected');

```

```
Holla from /idle
K, bye from /idle
Holla from /connected
Holla from /connected/front
Holla from /connected/front/danger
K, bye from /connected/front/danger
K, bye from /connected/front
K, bye from /connected
Holla from /disconnected

```

## relative(from, to) Explanation:

### Splitting and Filtering Paths:
We first split both the from and to path strings into arrays of path segments, using / as a delimiter.
.filter(o => o.trim().length) ensures that any empty segments are removed, so we only work with meaningful parts of the path.

### Checking if Paths are Identical:
If both paths have the same segments, it returns an empty string, indicating no traversal is needed as we're already at the same point in the state tree.

### Building Full Paths:
For both paths, we build full path arrays (fullFrom and fullTo) that represent the path from the root of the tree to each part of the path.
reduce is used here to create these paths by iteratively constructing the path segment by segment.

### Calculating Exit and Enter Paths:
Exit Paths: Find paths where from and to start to differ, and prepare to "exit" by reversing from the last differing point back to where they meet the 'root'.
Enter Paths: Find where the to path diverges and create a sequence to "enter" or move towards the new path state.

### Output:
The result is two arrays (exit, enter) that tell us how to move from the from state to the to state in terms of leaving one set of path states and entering another.
