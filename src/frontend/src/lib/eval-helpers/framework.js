
const getFrameworkNode = (framework, frameworkNodeId) => {
  return framework.frameworkNodes.find(x=>x.id===frameworkNodeId);
}

const getRubricRow = (framework, frameworkNodeId, rubricRowId) => {
  return framework.frameworkNodes.find(x=>x.id===frameworkNodeId).rubricRows.find(x=>x.id===rubricRowId);
}

export { 
  getFrameworkNode,
  getRubricRow
}