/**
 * Remark plugin that handles MkDocs-style image attribute syntax:
 *   ![alt](src){ align=left width=200}
 * Converts align to a float style and sets width on the img element.
 */
export default function remarkMkdocsAttr() {
  return function (tree) {
    walk(tree);
  };
}

function walk(node) {
  if (!node.children) return;
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (child.type === 'image') {
      const next = node.children[i + 1];
      if (next && next.type === 'text') {
        const match = next.value.match(/^\{([^}]+)\}/);
        if (match) {
          const attrStr = match[1];
          child.data = child.data || {};
          child.data.hProperties = child.data.hProperties || {};

          const alignMatch = attrStr.match(/align=(\w+)/);
          const widthMatch = attrStr.match(/width=(\d+)/);

          const styles = [];
          if (alignMatch) {
            styles.push(`float: ${alignMatch[1]}`);
            styles.push(`margin: 0 ${alignMatch[1] === 'left' ? '1.5rem 1rem 0' : '0 1rem 1.5rem'}`);
          }
          if (widthMatch) {
            styles.push(`width: ${widthMatch[1]}px`);
            styles.push(`height: auto`);
          }
          if (styles.length) child.data.hProperties.style = styles.join('; ');

          // Strip the matched attribute block from the following text node
          next.value = next.value.slice(match[0].length);
        }
      }
    }
    walk(child);
  }
}
