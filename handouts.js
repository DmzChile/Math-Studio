'use strict';

// Numbering follows the handouts. Section 2.7 problem 10 appears on two slides.
window.mathStudioHandoutSets = [
  {
    id: 'ode-2-7',
    section: '2.7',
    title: 'Nonhomogeneous Second-Order Linear ODEs',
    problems: [
      ['1', '12', 'General Solution', 'Find the general solution.\n\n\\[y\'\'+5y\'+6y=2e^{-x}\\]'],
      ['3', '13', 'General Solution', 'Find the general solution.\n\n\\[y\'\'+3y\'+2y=12x^2\\]'],
      ['6', '14', 'General Solution', 'Find the general solution.\n\n\\[y\'\'+y\'+\\left(\\pi^2+\\frac14\\right)y=e^{-x/2}\\sin(\\pi x)\\]'],
      ['8', '15', 'General Solution', 'Find the general solution.\n\n\\[\\left(3D^2+27I\\right)y=3\\cos(x)+\\cos(3x)\\]'],
      ['10', '16–17', 'General Solution', 'Find the general solution.\n\n\\[\\left(D^2+2D+I\\right)y=2x\\sin(x)\\]'],
      ['11', '18', 'Initial Value Problem', 'Solve the initial value problem.\n\n\\[y\'\'+4y=8x^2\\]\n\\[y(0)=-3,\\qquad y\'(0)=0\\]'],
      ['12', '19', 'Initial Value Problem', 'Solve the initial value problem.\n\n\\[y\'\'+4y=-12\\sin(2x)\\]\n\\[y(0)=1.8,\\qquad y\'(0)=5.0\\]']
    ]
  },
  {
    id: 'ode-2-10',
    section: '2.10',
    title: 'Variation of Parameters',
    problems: [
      ['3', '6', 'General Solution', 'Use variation of parameters to find the general solution.\n\n\\[x^2y\'\'-xy\'-3y=x^2\\]'],
      ['6', '7', 'General Solution', 'Use variation of parameters to find the general solution.\n\n\\[\\left(D^2+6D+9I\\right)y=\\frac{16e^{-3x}}{x^2+1}\\]'],
      ['9', '8', 'General Solution', 'Use variation of parameters to find the general solution.\n\n\\[\\left(D^2-2D+I\\right)y=35x^{3/2}e^x\\]'],
      ['13', '9', 'General Solution', 'Use variation of parameters to find the general solution.\n\n\\[\\left(x^2D^2+xD-9I\\right)y=48x^5\\]']
    ]
  },
  {
    id: 'ode-3-1',
    section: '3.1',
    title: 'Homogeneous Higher-Order Linear ODEs',
    problems: [
      ['1', '16', 'Solution and Basis', 'Find the general solution and a basis of the solution space.\n\n\\[y^{(4)}=0\\]'],
      ['2', '17', 'Solution and Basis', 'Find the general solution and a basis of the solution space.\n\n\\[2y\'\'\'-y\'\'-2y\'+y=0\\]'],
      ['3', '18', 'Solution and Basis', 'Find the general solution and a basis of the solution space.\n\n\\[y^{(4)}+2y\'\'+y=0\\]'],
      ['10', '19', 'Linear Independence', 'Determine whether these functions are linearly independent on \\(x\\ge 0\\).\n\n\\[e^{2x},\\qquad xe^{2x},\\qquad x^2e^{2x}\\]'],
      ['11', '20', 'Linear Independence', 'Determine whether these functions are linearly independent on \\(x\\ge 0\\).\n\n\\[e^{-x}\\cos(x),\\qquad e^{-x}\\sin(x),\\qquad e^{-x}\\]'],
      ['12', '21', 'Linear Independence', 'Determine whether these functions are linearly independent on \\(x\\ge 0\\).\n\n\\[\\sin^2(x),\\qquad\\cos^2(x),\\qquad\\cos(2x)\\]']
    ]
  },
  {
    id: 'ode-3-2',
    section: '3.2',
    title: 'Higher-Order Linear ODEs with Constant Coefficients',
    problems: [
      ['1', '10', 'General Solution', 'Find the general solution.\n\n\\[y\'\'\'+9y\'=0\\]'],
      ['2', '11', 'General Solution', 'Find the general solution.\n\n\\[y^{(4)}+2y\'\'\'+y=0\\]'],
      ['4', '12', 'General Solution', 'Find the general solution.\n\n\\[\\left(D^3-D^2-D+I\\right)y=0\\]'],
      ['5', '13', 'General Solution', 'Find the general solution.\n\n\\[\\left(D^4+10D^2+9I\\right)y=0\\]'],
      ['11', '14', 'Initial Value Problem', 'Solve the initial value problem.\n\n\\[y^{(4)}-9y\'\'-400y=0\\]\n\\[y(0)=0,\\;y\'(0)=0,\\;y\'\'(0)=41,\\;y\'\'\'(0)=0\\]']
    ]
  },
  {
    id: 'ode-3-3',
    section: '3.3',
    title: 'Nonhomogeneous Higher-Order Linear ODEs',
    problems: [
      ['1', '13', 'Undetermined Coefficients', 'Solve using undetermined coefficients.\n\n\\[y\'\'\'-3y\'\'+3y\'-y=e^x-x-1\\]'],
      ['3', '14', 'Undetermined Coefficients', 'Solve using undetermined coefficients.\n\n\\[\\left(D^4+5D^2+4I\\right)y=3.5\\sinh(2x)\\]'],
      ['5', '15', 'Variation of Parameters', 'Solve using variation of parameters.\n\n\\[\\left(x^3D^3+2x^2D^2-xD+I\\right)y=x^{-2}\\]'],
      ['9', '16', 'Undetermined Coefficients', 'Solve using undetermined coefficients.\n\n\\[y^{(4)}+5y\'\'+4y=90\\sin(4x)\\]'],
      ['15', '17', 'Undetermined Coefficients', 'Solve using undetermined coefficients. Use the substitution \\(x=e^t,\\ t=\\ln(x)\\).\n\n\\[x^2y\'\'-3xy\'+3y=3\\ln(x)-4\\]']
    ]
  },
  {
    id: 'la-linear-systems-spaces',
    course: 'linear',
    title: 'Null Space, Complete Solution, and Column Space',
    problems: [
      ['1', null, 'Basis of the Null Space', 'Let \\(A=\\begin{bmatrix}1&2&-1\\\\2&4&-2\\end{bmatrix}\\).\n\nSolve \\(Ax=0\\). Identify the free variables, then find a basis and the dimension of \\(N(A)\\).'],
      ['2', null, 'Particular and Complete Solutions', 'Let \\(A=\\begin{bmatrix}1&1&1\\\\2&2&2\\\\1&-1&1\\end{bmatrix}\\) and \\(b=(3,6,1)^{\\mathsf T}\\).\n\nFind one particular solution \\(x_p\\) and use \\(N(A)\\) to write the complete solution \\(x=x_p+x_n\\). Does a solution exist if the second entry of b is changed from 6 to 5? Explain.'],
      ['3', null, 'Pivot Columns and a Column Space Basis', 'Let \\(A=\\begin{bmatrix}1&2&0&1\\\\2&4&1&1\\\\1&2&1&0\\end{bmatrix}\\).\n\nFind the pivot columns and use the corresponding columns of the original matrix to give a basis of \\(C(A)\\). Express each remaining column as a linear combination of that basis.'],
      ['4', null, 'Membership in the Column Space', 'Let \\(A=\\begin{bmatrix}1&0\\\\0&1\\\\2&-1\\end{bmatrix}\\), \\(u=(2,3,1)^{\\mathsf T}\\), and \\(v=(1,1,2)^{\\mathsf T}\\).\n\nDerive a condition on the entries of \\(b=(b_1,b_2,b_3)^{\\mathsf T}\\) for \\(b\\in C(A)\\). Use it to decide whether u and v belong to \\(C(A)\\). For each vector that belongs, solve \\(Ax=b\\) with that vector as the right-hand side.'],
      ['5', null, 'Null Space, Column Space, and the Complete Solution', 'Let \\(A=\\begin{bmatrix}1&2&-1&0\\\\2&4&0&2\\\\-1&-2&2&1\\end{bmatrix}\\) and \\(b=(1,4,0)^{\\mathsf T}\\).\n\n(a) Find a basis and the dimension of each of \\(N(A)\\) and \\(C(A)\\).\n(b) Find the complete solution to \\(Ax=b\\).\n(c) Which space always has dimension equal to the number of free parameters in a consistent system \\(Ax=b\\)? Explain.'],
      ['6', null, 'Classifying Solutions by a Parameter', 'Let \\(A_t=\\begin{bmatrix}1&2&0\\\\0&t&1\\\\0&0&t-1\\end{bmatrix}\\) and \\(b=(3,1,-1)^{\\mathsf T}\\).\n\nFor which real values of t does \\(A_tx=b\\) have no solution, exactly one solution, or infinitely many solutions? Write the complete solution in the infinite case.'],
      ['7', null, 'Which Spaces Do Row Operations Preserve?', 'Matrices A and B have the same size and the same reduced row echelon form.\n\nDecide whether each claim must be true. Justify each true claim and give a counterexample to each false claim.\n(a) \\(N(A)=N(B)\\).\n(b) \\(C(A)=C(B)\\).\n(c) \\(\\dim C(A)=\\dim C(B)\\).'],
      ['8', null, 'Constructing a Matrix from Two Spaces', 'Construct a \\(3\\times4\\) matrix A such that\n\n\\[N(A)=\\operatorname{span}\\{(1,-1,0,0)^{\\mathsf T},\\ (0,1,1,0)^{\\mathsf T}\\},\\]\n\\[C(A)=\\operatorname{span}\\{(1,0,1)^{\\mathsf T},\\ (0,1,1)^{\\mathsf T}\\}.\\]\n\nVerify both requirements and find the complete solution to \\(Ax=(2,3,5)^{\\mathsf T}\\) for your matrix.']
    ]
  },
  {
    id: 'practice-laplace-transforms',
    course: 'engineering',
    title: 'Laplace Transform Practice',
    problems: [
      ["1",null,"Laplace Transform from the Definition","Use the defining integral of the Laplace transform to find \\(F(s)=\\mathcal{L}\\{t e^{-2t}\\}(s)\\). Determine the real values of \\(s\\) for which the integral converges."],
      ["2",null,"Inverse Transform with a Repeated Pole","Use partial fractions to find the inverse Laplace transform of\n\n\\[F(s)=\\frac{2s+5}{(s+1)^2(s+3)}.\\]"],
      ["3",null,"Transform of a Finite Ramp Pulse","Express the following function in terms of the Heaviside unit step \\(u(t-a)\\), taking \\(u(0)=1\\). Then use the second shifting theorem to find its Laplace transform for \\(s>0\\).\n\n\\[f(t)=\\begin{cases}0,&0\\le t<1,\\\\t-1,&1\\le t<3,\\\\0,&t\\ge3.\\end{cases}\\]"],
      ["4",null,"Initial Value Problem with a Delayed Step","Use Laplace transforms to solve the initial value problem below, where \\(u(t-2)\\) is the Heaviside unit step. Give the solution in unit-step form.\n\n\\[y''+3y'+2y=4u(t-2),\\qquad y(0)=1,\\quad y'(0)=0.\\]"]
    ]
  }
].map(({ id, section, title, course = 'engineering', problems }) => ({
  id,
  section,
  title,
  course,
  problems: problems.map(([number, page, task, statement]) => ({
    id: id + '-' + number,
    course,
    unit: title,
    title: 'Problem ' + number + ' · ' + task,
    kind: 'original',
    statement,
    ...window.mathStudioHandoutAnswers[id + '-' + number],
    source: page ? 'Section ' + section + ', PDF ' + (page.includes('–') ? 'pp. ' : 'p. ') + page +
      (section === '3.3' && number === '15' ? ' · (2-7) Problem 15' : '') : undefined,
    setId: id
  }))
}));
