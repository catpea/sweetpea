import Garbage from './garbage/Garbage.js';
import Macro from './macro/Macro.js';
import Core from './core/Core.js';
import DataContext from './data-context/DataContext.js';
import ElementSearch from './element-search/ElementSearch.js';
import Logging from './logging/Logging.js';
import Curlies from './curlies/Curlies.js';
import ElementEvents from './element-events/ElementEvents.js';
import UseAttribute from './use-attribute/UseAttribute.js';
import Animation from './animation/Animation.js';
import Project from './project/Project.js';
import VisualProgramming from './visual-programming/VisualProgramming.js';
import ActorIntegration from './actor-integration/ActorIntegration.js';
import SelectionManager from './selection-manager/SelectionManager.js';
import ComponentEvents from './component-events/ComponentEvents.js';

export default function(){

  const plugins = [
    Garbage,       // garbage collection
    Macro,       // await macro.x.x.x.x.x.run();
    Core,          // shared functions
    DataContext,   // the notion of this.context in this case based on data-* attributes
    ElementSearch, // verbose element locator that searches within the components zone of influence only
    Logging,       // .log functionality and related methods
    Curlies,       // Sigh, {{}} bracket expansion and interpolation
    ElementEvents, // Sigh, onclick="()=>" events
    UseAttribute,   // <element use="feature1, feature2"> support
    Animation,   // flipCard()
    Project,   // open/save()
    VisualProgramming,   // addSupervisor()
    ActorIntegration,   // installActor()
    SelectionManager,   // select() deselect()
    ComponentEvents,   // ready) busy~idle (exit
  ];

  const Inheritance = plugins.reduce( (Composition, Class) => Class(Composition), class Root {} );

  return Inheritance;

}
