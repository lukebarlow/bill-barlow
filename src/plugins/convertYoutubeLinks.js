/*
Convert YouTube links into IFRAME embedded videos
*/
module.exports = (opts = {}) => {
  return async (tree) => {
    tree.children = tree.children.map(node => {
      if (node.type === 'paragraph' && node.children[0].type === 'link') {
        const result = node.children[0].url.match(/=([a-zA-Z]+)$/)
        if (result) {
          return {
            type: 'jsx',
            value: `<p><iframe width="560" height="315" 
             src="https://www.youtube.com/embed/${result[1]}" frameBorder="0" 
             allow="accelerometer; autoplay; clipboard-write; encrypted-media;
             gyroscope; picture-in-picture" allowFullScreen></iframe></p>`,
            position: node.position
          }
        } else {
          return node
        }
      } else {
        return node
      }
    })
  }
}