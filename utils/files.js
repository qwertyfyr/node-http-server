const fs = require("fs");

async function isFile(path) {
  try {
    const stats = await fs.promises.lstat(path);
    return stats.isFile();
  } catch {
    return false;
  }
}

// Delete 1 file
function removeFile(filePath) {
  fs.unlink(filePath, (err) => {
    err
      ? console.log(err)
      : console.log("sucessfully deleted file: ", filePath);
  });
}

// Delete 1 folder
function removeFolder(folderPath) {
  fs.rmdir(folderPath, (err) => {
    err
      ? console.log(err)
      : console.log("sucessfully deleted folder: ", folderPath);
  });
}

// Delete an entire Tree
export async function removeTree(treePath) {
  if (await isFile(treePath)) {
    removeFile(treePath);
    return;
  }

  const nodes = await fs.promises.readdir(treePath);
  for (let node of nodes) {
    const nodePath = `${treePath}/${node}`;
    console.log("checking: ", nodePath);
    await removeTree(nodePath);
  }
  console.log("removing: ", treePath);
  removeFolder(treePath);
  return;
}

// Create a new folder
function createFolder(currentPath, name) {
  const folderPath = currentPath + name;
  fs.mkdir(folderPath);
}

// Upload a singular file
function uploadFile() {}

// Uploading multiple files
function uploadFiles() {}

// Upload a folder with contents inside
function uploadFolder() {}
