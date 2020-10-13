const dirTree = require("directory-tree");
const readMarkdown = require('read-markdown')
const tree = dirTree('./animation', null, (item, PATH, stats) => {
     console.log(item);
    // console.log(PATH);
    //console.log(stats)
});


readMarkdown('./animation/dist/**/*.md')
    .then(function(data){
        console.log(data)
    })
    .catch(console.error)