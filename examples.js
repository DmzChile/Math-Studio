window.mathStudioExamples = [
  {
    id: 'em-separable', course: 'engineering', unit: 'Differential Equations', kind: 'original', level: 'Beginner',
    title: 'Separable Differential Equation',
    statement: 'Solve the initial value problem \\(y\'=2xy,\\ y(0)=3\\).',
    solution: 'Since y(0) = 3, divide by y near x = 0 and separate variables: dy/y = 2x dx. Integrate to get ln |y| = x² + C. The positive initial value gives y = Ae^(x²) with A > 0.\n\nThe condition at x = 0 gives A = 3. Thus y(x) = 3e^(x²). Differentiating gives y′ = 2x · 3e^(x²) = 2xy, so the formula solves the equation for all real x.'
  },
  {
    id: 'la-determinant', course: 'linear', unit: 'Matrices and Determinants', kind: 'original', level: 'Beginner',
    title: 'Determinant of a 2 × 2 Matrix',
    statement: 'Find the determinant of \\(A=\\begin{bmatrix}3&2\\\\1&4\\end{bmatrix}\\).',
    solution: 'For a 2 × 2 matrix [[a, b], [c, d]], the determinant is ad − bc. Here the main diagonal product is 3 × 4 = 12 and the other diagonal product is 2 × 1 = 2.\n\nTherefore det(A) = 12 − 2 = 10.'
  },
  {
    id: 'em-laplace-var', course: 'engineering', unit: 'Laplace Transforms', kind: 'variant', level: 'Intermediate',
    parentId: 'em-laplace', title: 'Laplace Transform of an Exponentially Damped Sine',
    statement: 'Find the Laplace transform of \\(f(t)=e^{-2t}\\sin(3t)\\).',
    solution: 'Start with F(s) = L{sin(3t)} = 3/(s² + 9). The first shifting theorem gives L{e^(at)f(t)}(s) = F(s − a). Here a = −2, so the argument shifts to s + 2.\n\nThe transform is 3/((s + 2)² + 9) for Re(s) > −2.'
  },
  {
    id: 'em-laplace', course: 'engineering', unit: 'Laplace Transforms', kind: 'original', level: 'Beginner',
    title: 'Laplace Transform of a Sine',
    statement: 'Find the Laplace transform of \\(f(t)=\\sin(3t)\\).',
    solution: 'Use the transform pair L{sin(at)} = a/(s² + a²) for Re(s) > 0. The frequency here is a = 3, so the numerator is 3 and the denominator is s² + 3².\n\nThe transform is 3/(s² + 9) for Re(s) > 0.'
  },
  {
    id: 'la-eigen', course: 'linear', unit: 'Eigenvalues and Eigenvectors', kind: 'original', level: 'Intermediate',
    title: 'Eigenvalues of a Triangular Matrix',
    statement: 'Find the eigenvalues of \\(A=\\begin{bmatrix}2&1\\\\0&3\\end{bmatrix}\\) and give one eigenvector for each eigenvalue.',
    solution: 'Since A is triangular, det(A − λI) = (2 − λ)(3 − λ). The eigenvalues are 2 and 3.\n\nFor λ = 2, solving (A − 2I)v = 0 forces the second component to be zero, so take v = (1, 0). For λ = 3, the first row of A − 3I gives −v₁ + v₂ = 0, so take v = (1, 1).'
  },
  {
    id: 'la-eigen-var', course: 'linear', unit: 'Eigenvalues and Eigenvectors', kind: 'variant', level: 'Advanced',
    parentId: 'la-eigen', title: 'Repeated Eigenvalues and Diagonalization',
    statement: 'Find the eigenspace of \\(A=\\begin{bmatrix}2&1\\\\0&2\\end{bmatrix}\\) and determine whether A is diagonalizable.',
    solution: 'The characteristic polynomial is (2 − λ)², so λ = 2 has algebraic multiplicity two. The matrix A − 2I = [[0, 1], [0, 0]] gives v₂ = 0. Thus the eigenspace is span{(1, 0)} and has dimension one.\n\nA 2 × 2 matrix needs two linearly independent eigenvectors to be diagonalizable. This matrix has only one independent eigenvector, so it is not diagonalizable.'
  }
].map(problem => ({ ...problem, sample: true }));
