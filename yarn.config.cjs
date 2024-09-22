const { defineConfig } = require("@yarnpkg/types");

module.exports = defineConfig({
  async constraints({ Yarn }) {
    const rootWorkspace = Yarn.workspace({ cwd: "." });
    if (rootWorkspace == null) {
      Yarn.workspace().error("Didn't find a root workspace?!");
      return;
    }

    // Use ESM everywhere.
    for (const workspace of Yarn.workspaces()) {
      workspace.set("type", "module");
    }

    // Set a consistent repository for all workspaces.
    if (rootWorkspace.manifest.repository == null) {
      rootWorkspace.error("Missing repository specification!");
    }
    for (const workspace of Yarn.workspaces()) {
      if (workspace.cwd !== ".") {
        workspace.set("repository.directory", workspace.cwd);
        workspace.set(
          "repository.type",
          rootWorkspace.manifest.repository.type,
        );
        workspace.set("repository.url", rootWorkspace.manifest.repository.url);
      } else {
        workspace.unset("repository.directory");
      }
    }

    // Expect each workspace to either have a license or be private.
    for (const workspace of Yarn.workspaces()) {
      if (workspace.manifest.license == null && !workspace.manifest.private) {
        // Don't default since we want a human to make the call.
        workspace.error("Missing license for non-private workspace!");
      }
    }

    // Expect each workspace to specify a version, except for the root.
    for (const workspace of Yarn.workspaces()) {
      if (workspace.cwd !== ".") {
        workspace.set("version", workspace.manifest.version ?? "0.0.1");
      } else {
        workspace.unset("version");
      }
    }

    // Explicitly specify whether the workspace is private or not.
    for (const workspace of Yarn.workspaces()) {
      workspace.set("private", !!workspace.manifest.private);
    }
  },
});
