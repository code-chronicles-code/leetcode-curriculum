module.exports = {
  async constraints({ Yarn }) {
    for (const workspace of Yarn.workspaces()) {
      workspace.set("type", "module");
    }
  },
};
