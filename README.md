# Math Studio

Math Studio is an English-language practice site for **Engineering Mathematics** and **Linear Algebra**. Use it to work through problems from course handouts, check worked solutions, and practice the same methods on linked variants.

## Run locally

1. Download and extract the repository ZIP from **Code → Download ZIP**, or clone it with Git.
2. Open `index.html` in a browser. Keep the files and the `katex/` directory together so equations, fonts, and images load.

```sh
git clone https://github.com/DmzChile/Math-Studio.git
```

The site includes its dependencies and runs offline after download.

## Study with Math Studio

1. Choose **Engineering Mathematics** or **Linear Algebra** in the sidebar, or open **Problem Bank** to browse both courses.
2. Search by title or topic, or open **Problem Sets** to work through a group of related exercises.
3. Open a problem and try it yourself. When a worked solution is available, expand **Show answer and solution**. Open a linked variant for more practice with the same method.

## Add your own practice

- Use **Add Problem** to write a problem, or **Add Variant** on an original problem to create a linked exercise.
- Open an existing set and choose **Add Problem** to add an exercise to that set. Use **Problem Sets → Add Set** to create a new set.
- Use **Edit** in a problem's detail view when the option is available. In the editor, use `\( ... \)` for inline math and `\[ ... \]` for display equations. Check **Preview** before saving.

Problems, sets, and edits made in the interface are stored in the current browser's local storage. To distribute a change with the site, update the bundled source files.

## Update the bundled problems

| File | Purpose |
| --- | --- |
| [`handouts.js`](handouts.js) | Problem sets and problem statements |
| [`handout-answers.js`](handout-answers.js) | Difficulty ratings and worked solutions |
| [`examples.js`](examples.js) | Sample problems and linked variants |

See the [problem authoring guide (Korean)](%EB%AC%B8%EC%A0%9C%20%EB%B0%8F%20%EB%AC%B8%EC%A0%9C%EC%A7%91%20%EC%B6%94%EA%B0%80%20%EB%B0%A9%EB%B2%95.md) for the data format and LaTeX examples. In this repository, the site files are at the root.
