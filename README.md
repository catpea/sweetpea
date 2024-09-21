# :melon: sweetpea
Signal and Web Component Enhanced Web Apps

## NOTES

- vplSystem bindInputs duplicates functionality of bind element, i don't want to inject bind element everywhere, this should also be updated to work with all inputs.

## TODO
- port id="out2" icon="lightning" not all state must sit in signal tree some state can be inside element as it relates purely to UI
- pipe component
- generalize signal tree funcions SIGNAL.ensignal/SIGNAL.designal
- dumpt tree to json
- pan
- zoom
- minimap
- generalize data-binding into a shared function so that bind and auto-bind use the same code


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
