const useTraverseTree = () => {
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      return {
        ...tree,
        items: [
          {
            id: new Date().getTime(),
            name: item,
            isFolder: isFolder,
            items: isFolder ? [] : [],
          },
          ...tree.items,
        ],
      };
    }

    const latestNode = tree.items.map((obj) => {
      return insertNode(obj, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  }

  return { insertNode };
};

export default useTraverseTree;
