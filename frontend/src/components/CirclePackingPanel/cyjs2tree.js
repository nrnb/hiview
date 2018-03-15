import * as d3Hierarchy from 'd3-hierarchy'

const cyjs2tree = cyjs => {
  if (cyjs === undefined || cyjs === null) {
    // Return empty

    return null
  }

  //Find root
  const nodes = cyjs.elements.nodes
  let idx = nodes.length

  const nodeMap = {}

  // Root info is stored in network data
  let root = null

  while (idx--) {
    const node = nodes[idx]
    const data = node.data
    if (
      !data['Label'].includes('Hidden') &&
      !data['Label'].includes('Linked')
    ) {
      const isRoot = nodes[idx].data.isRoot
      if (isRoot) {
        root = nodes[idx]
      }

      const nodeData = nodes[idx].data
      nodeMap[nodeData.id] = nodeData
    }
  }

  console.log(cyjs)
  console.log(Object.keys(nodeMap).length)
  console.log(root)

  const rootId = root.data.id
  const edges = cyjs.elements.edges

  const table = transform(rootId, edges, nodeMap)

  return d3Hierarchy
    .stratify()
    .id(d => d.id)
    .parentId(d => d.parent)(table)
}

const transform = (rootId, edges, nodeMap) => {
  const table = []

  table.push({
    id: nodeMap[rootId].id,
    Label: nodeMap[rootId].Label,
    parent: '',
    props: nodeMap[rootId]
  })

  edges.forEach(edge => {
    const source = nodeMap[edge.data.source]
    const target = nodeMap[edge.data.target]

    if (
      source !== undefined &&
      target !== undefined &&
      edge.data['Is_Tree_Edge'] === 'Tree' &&
      nodeMap[source.id] !== undefined &&
      nodeMap[target.id] !== undefined
    ) {
      table.push({
        id: source.id,
        Label: source.Label,
        parent: target.id,
        value: source.Size,
        NodeType: source.NodeType,
        props: source
      })
    }
  })

  return table
}

export default cyjs2tree
