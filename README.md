# :melon: sweetpea
Signal and Web Component Enhanced Web Apps

## NOTES

- vplSystem bindInputs duplicates functionality of bind element, i don't want to inject bind element everywhere, this should also be updated to work with all inputs.

## TODO
- add a binding component, use form data, and data set
- add valve connections


```JavaScript

function collectParents(element, root) {
    const parents = [];
    let parent = element.parentNode;
    while (parent !== root) {
        parents.push(parent);
        parent = parent.parentNode;
    }
    return parents;
}

function isOutermostElement(parents) {
    const hasInnerDataTag = !!parents.map(p => p.tagName).find(tag => tag.match(/^DATA-/));
    return !hasInnerDataTag;
}

// Main logic refactored for readability
templateClone.querySelectorAll('source').forEach(source => {
    const parents = collectParents(source, templateClone);
    const isOutermost = isOutermostElement(parents);

    if(!isOutermost) return; // only interested in outermost

    console.log('PASSED');
});

```
