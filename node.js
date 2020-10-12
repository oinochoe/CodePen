const dirTree = require("directory-tree");
const tree = dirTree("animation");
console.log(tree.children[0].children);