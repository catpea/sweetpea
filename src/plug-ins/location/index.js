
// reason for existence: run dynamically loaded modules on github's subfolder
// reason for existence 2: run dynamically loaded modules in NW js, that adds index.html

export default function location(url){
  const currentUrl = new URL(url);
  const pathName = currentUrl.pathname; // Normalize
  const basePath = /\.[a-z0-9]+$/i.test(pathName.split('/').pop())?pathName.split('/').slice(0,-1).join('/'):pathName;
  const noTrailingSlash = basePath.replace(/\/+$/,'')
  return noTrailingSlash;
}
