# Contributing to nest-cassandra

We welcome and are open to new contributions to this project. Before you submit your amazing new feature or improvement,
please read the following contribution rules, so everything goes smooth :sparkles:. Some of the rules are based on Nest.js', so you may already be familiar with them!

- [Feature Requests](#feature)
- [Issues and Bugs](#issue)
- [Submission Guidelines](#submit)

## <a name="feature"></a> Missing a Feature?

You can _request_ a new feature by [submitting an issue](#submit-issue) to our GitHub
Repository. If you would like to _implement_ a new feature, please submit an issue with
a proposal for your work first, to be sure that we can use it.
Please consider what kind of change it is:

- For a **Major Feature**, first open an issue and outline your proposal so that it can be
  discussed. This will also allow us to better coordinate our efforts, prevent duplication of work,
  and help you to craft the change so that it is successfully accepted into the project. For your issue name, please prefix your proposal with `[discussion]`, for example "[discussion]: your feature idea".
- **Small Features** can be crafted and directly [submitted as a Pull Request](#submit-pr).

## <a name="issue"></a> Issues and Bugs

If you find a bug in the library, you can help us by
[submitting an issue](#submit-issue) to our [GitHub Repository][github]. Even better, you can
[submit a Pull Request](#submit-pr) with a fix.

Before you submit an issue, please search the issue tracker, maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it. In order to reproduce bugs we will systematically ask you to provide a minimal reproduction scenario using a repository or [Gist](https://gist.github.com/). Having a live, reproducible scenario gives us wealth of important information without going back & forth to you with additional questions like:

- Version of `@liliana1110/nest-cassandra`
- Version of `@nestjs/core`
- (if present) all 3rd-party libraries and their versions
- **most importantly** a use-case that fails and/or steps to reproduce this issue

Unfortunately, we are not able to investigate / fix bugs without a minimal reproduction, so if we don't hear back from you we are going to close an issue that don't have enough info to be reproduced.

You can file new issues by filling out our [new issue form](https://github.com/lilianalillyy/nest-cassandra/issues/new).

## <a name="submit"></a> Submission Guidelines

Before you submit your Pull Request (PR) consider the following guidelines:

1. Search [GitHub](https://github.com/lilianalillyy/nest-cassandra/pulls) for an open or closed PR
   that relates to your submission. You don't want to duplicate effort.
2. Fork the `lilianalillyy/nest-cassandra` repository.
3. Make your changes in a new git branch:

   ```shell
   git checkout -b feature/feature-name
   ```

4. Ensure that all linters pass! (use `pnpm lint`)
5. Commit your changes using a descriptive commit message that follows the
   [convention commit convention](https://www.conventionalcommits.org/en/v1.0.0/).

   ```shell
   git commit -m "feat(orm): added decorator NewDecorator"
   ```

6. Push your branch to GitHub:

   ```shell
   git push origin feature/feature-name
   ```

7. In GitHub, send a pull request to `nest-cassandra:main`.

- If we suggest changes then:

  - Make the required updates.
  - Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase main -i
    git push -f
    ```

That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

- Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

  ```shell
  git push origin --delete feature/feature-name
  ```

- Check out the main branch:

  ```shell
  git checkout main -f
  ```

- Delete the local branch:

  ```shell
  git branch -D feature/feature-name
  ```

- Update your main with the latest upstream version:

  ```shell
  git pull --ff upstream main
  ```
