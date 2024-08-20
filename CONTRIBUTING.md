# Contributing

Thanks for your interest in contributing to this project! Contributions of all kinds are welcome and encouraged, whether in the form of code, documentation, discussion on issues, or something else.

## Picking a Task

If you're new to this project, start with a [good first issue](../../contribute) to get a feel for how the repository works. We try to maintain a backlog of relatively straightforward tasks, that are well-defined and scoped.

If you'd like to contribute more regularly, join the Code Chronicles server on Discord! The server is private, but you can contact [@miorel](https://github.com/miorel) for an invite, via the email listed in the repository's `git log`.

> [!IMPORTANT]
> If you decide to work on an issue, comment on it, so others are aware. This will avoid duplicated work as well as give the maintainers a chance to offer their assistance if needed.

## GitHub Workflow

Changes to the repository are proposed via GitHub pull requests.

It's recommended to use [GitHub's command-line interface](https://cli.github.com/), as it will simplify the GitHub workflow. Specifically, you can:

1. **Clone this repository directly**, without needing a fork at this point:

```sh
# Many repositories require forking, but we can save that for later.
git clone https://github.com/code-chronicles-code/leetcode-curriculum.git
```

2. **Make your changes** on a local branch and commit them:

```sh
# Create and check out a new branch!
git checkout -b some-cool-stuff

# After making some changes:
git commit -am "A descriptive message"
```

3. Use the GitHub CLI to **create a pull request**. The GitHub CLI can fork the repository for you and set everything up.

```sh
# You should only have to do this once:
gh auth login

# This is how you can create pull requests from now on.
# Pick the option that creates a fork.
gh pr create
```

If you prefer not to use the GitHub CLI, you can still create a pull request by any other means you like. Take a look at the GitHub docs on [creating a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) and [creating a pull request from a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork).

## License

By contributing to this GitHub repository, you agree to license your contributions under [the MIT license](./LICENSE).
