'use strict';

window.mathStudioHandoutAnswers = {
  "ode-2-7-1": {
    "level": "Beginner",
    "solution": "The characteristic equation is r² + 5r + 6 = (r + 2)(r + 3) = 0, so yₕ = C₁e^(−2x) + C₂e^(−3x).\n\nBecause −1 is not a characteristic root, try yₚ = Ae^(−x). Substitution gives (1 − 5 + 6)Ae^(−x) = 2Ae^(−x), so A = 1.\n\nGeneral solution: y = C₁e^(−2x) + C₂e^(−3x) + e^(−x)."
  },
  "ode-2-7-3": {
    "level": "Beginner",
    "solution": "The homogeneous equation has roots −1 and −2 because r² + 3r + 2 = (r + 1)(r + 2).\n\nTry yₚ = Ax² + Bx + C. The left-hand side becomes 2Ax² + (6A + 2B)x + (2A + 3B + 2C). Matching the coefficients of 12x² gives A = 6, B = −18, and C = 21.\n\nGeneral solution: y = C₁e^(−x) + C₂e^(−2x) + 6x² − 18x + 21."
  },
  "ode-2-7-6": {
    "level": "Advanced",
    "solution": "The characteristic roots are −1/2 ± iπ, so the forcing has the same exponential and trigonometric factors as a homogeneous solution.\n\nSet y = e^(−x/2)u. The left-hand side simplifies to e^(−x/2)(u″ + π²u), leaving u″ + π²u = sin(πx). For the resonant forcing, try uₚ = Ax cos(πx). Since (D² + π²)[x cos(πx)] = −2π sin(πx), A = −1/(2π).\n\nGeneral solution: y = e^(−x/2)[C₁cos(πx) + C₂sin(πx) − x cos(πx)/(2π)]."
  },
  "ode-2-7-8": {
    "level": "Intermediate",
    "solution": "The homogeneous equation is y″ + 9y = 0, so its basis is cos(3x), sin(3x). Find a particular term for each forcing separately.\n\nFor 3 cos(x), use A cos(x). Applying 3D² + 27I multiplies cos(x) by 24, so A = 1/8. For the resonant cos(3x) term, use Bx sin(3x). Applying the operator gives 18B cos(3x), so B = 1/18.\n\nGeneral solution: y = C₁cos(3x) + C₂sin(3x) + cos(x)/8 + x sin(3x)/18."
  },
  "ode-2-7-10": {
    "level": "Advanced",
    "solution": "The characteristic polynomial is (r + 1)², so yₕ = (C₁ + C₂x)e^(−x). For the forcing 2x sin(x), try yₚ = (ax + b)cos(x) + (cx + d)sin(x).\n\nFor p = ax + b and q = cx + d, applying D² + 2D + I gives (2a + 2c + 2q)cos(x) + (2c − 2a − 2p)sin(x). Matching the coefficients of 2x sin(x) gives c = 0, a = −1, d = 1, and b = 1.\n\nGeneral solution: y = (C₁ + C₂x)e^(−x) + (1 − x)cos(x) + sin(x)."
  },
  "ode-2-7-11": {
    "level": "Intermediate",
    "solution": "The homogeneous solution is C₁cos(2x) + C₂sin(2x). Trying yₚ = Ax² + Bx + C gives 4Ax² + 4Bx + 2A + 4C = 8x². Thus yₚ = 2x² − 1.\n\nFrom y(0) = C₁ − 1 = −3, get C₁ = −2. From y′(0) = 2C₂ = 0, get C₂ = 0.\n\nSolution: y = 2x² − 1 − 2cos(2x)."
  },
  "ode-2-7-12": {
    "level": "Intermediate",
    "solution": "The homogeneous basis is cos(2x), sin(2x). The forcing is resonant. Because (D² + 4I)[x cos(2x)] = −4 sin(2x), take yₚ = 3x cos(2x).\n\nThe condition y(0) = 1.8 gives C₁ = 1.8. The derivative at zero includes yₚ′(0) = 3, so 2C₂ + 3 = 5 and C₂ = 1.\n\nSolution: y = 1.8cos(2x) + sin(2x) + 3x cos(2x)."
  },
  "ode-2-10-3": {
    "level": "Intermediate",
    "solution": "Divide by x² on an interval that avoids zero. For the homogeneous Euler equation, the trial y = x^m gives m(m − 1) − m − 3 = (m − 3)(m + 1). Use y₁ = x³ and y₂ = x⁻¹, with W = y₁y₂′ − y₁′y₂ = −4x.\n\nThe normalized forcing is g = 1. Variation of parameters gives u₁′ = −y₂g/W = 1/(4x²) and u₂′ = y₁g/W = −x²/4. Take u₁ = −1/(4x), u₂ = −x³/12. Then yₚ = u₁y₁ + u₂y₂ = −x²/3.\n\nGeneral solution: y = C₁x³ + C₂/x − x²/3, on either x > 0 or x < 0."
  },
  "ode-2-10-6": {
    "level": "Intermediate",
    "solution": "The characteristic polynomial is (r + 3)². Choose y₁ = e^(−3x), y₂ = xe^(−3x), so W = e^(−6x).\n\nWith g = 16e^(−3x)/(1 + x²), variation of parameters gives u₁′ = −16x/(1 + x²) and u₂′ = 16/(1 + x²). Integrate to get u₁ = −8 ln(1 + x²) and u₂ = 16 arctan(x). Constants of integration can be absorbed into the homogeneous solution.\n\nGeneral solution: y = e^(−3x)[C₁ + C₂x − 8 ln(1 + x²) + 16x arctan(x)]."
  },
  "ode-2-10-9": {
    "level": "Intermediate",
    "solution": "The characteristic polynomial is (r − 1)². Choose y₁ = e^x and y₂ = xe^x, so W = e^(2x).\n\nUsing g = 35x^(3/2)e^x, variation of parameters gives u₁′ = −35x^(5/2) and u₂′ = 35x^(3/2). Thus u₁ = −10x^(7/2) and u₂ = 14x^(5/2). Their contributions combine to give yₚ = 4x^(7/2)e^x.\n\nGeneral solution: y = e^x[C₁ + C₂x + 4x^(7/2)], on x > 0 for real-valued powers."
  },
  "ode-2-10-13": {
    "level": "Intermediate",
    "solution": "Divide by x². The homogeneous Euler equation gives m² − 9 = 0. Take y₁ = x³ and y₂ = x⁻³. Their Wronskian is W = −6/x, and the normalized forcing is g = 48x³.\n\nVariation of parameters gives u₁′ = −y₂g/W = 8x and u₂′ = y₁g/W = −8x⁷. Take u₁ = 4x² and u₂ = −x⁸. Then yₚ = 4x⁵ − x⁵ = 3x⁵.\n\nGeneral solution: y = C₁x³ + C₂x⁻³ + 3x⁵, on either x > 0 or x < 0."
  },
  "ode-3-1-1": {
    "level": "Beginner",
    "solution": "Integrating y⁽⁴⁾ = 0 four times gives an arbitrary polynomial of degree at most three. The integration constants absorb any factorial factors.\n\nGeneral solution: y = C₁ + C₂x + C₃x² + C₄x³.\nBasis: {1, x, x², x³}. These monomials are linearly independent because a polynomial that vanishes identically has all coefficients equal to zero."
  },
  "ode-3-1-2": {
    "level": "Intermediate",
    "solution": "Group the characteristic polynomial:\n2r³ − r² − 2r + 1 = (2r − 1)(r² − 1) = (2r − 1)(r − 1)(r + 1).\n\nThe roots 1/2, 1, and −1 are distinct. Each contributes an exponential solution, and exponentials with distinct exponents are linearly independent.\n\nGeneral solution: y = C₁e^(x/2) + C₂e^x + C₃e^(−x).\nBasis: {e^(x/2), e^x, e^(−x)}."
  },
  "ode-3-1-3": {
    "level": "Intermediate",
    "solution": "The characteristic polynomial is r⁴ + 2r² + 1 = (r² + 1)². The roots i and −i each have multiplicity two. The simple modes give cos(x) and sin(x). Multiplying each by x supplies the two additional modes required by the repeated roots.\n\nGeneral solution: y = (C₁ + C₂x)cos(x) + (C₃ + C₄x)sin(x).\nBasis: {cos(x), x cos(x), sin(x), x sin(x)}."
  },
  "ode-3-1-10": {
    "level": "Beginner",
    "solution": "Suppose a e^(2x) + b x e^(2x) + c x²e^(2x) = 0 for every x ≥ 0. Divide by e^(2x), which is never zero, to get a + bx + cx² = 0 on the entire interval. A polynomial that vanishes on an interval is the zero polynomial, so a = b = c = 0.\n\nThe three functions are linearly independent on x ≥ 0."
  },
  "ode-3-1-11": {
    "level": "Intermediate",
    "solution": "A zero linear combination, after division by e^(−x), has the form a cos(x) + b sin(x) + c = 0 for every x ≥ 0. Evaluating at x = 0 and x = π gives a + c = 0 and −a + c = 0, so a = c = 0. Evaluating at x = π/2 then gives b = 0.\n\nThe three functions are linearly independent on x ≥ 0."
  },
  "ode-3-1-12": {
    "level": "Beginner",
    "solution": "The double-angle identity gives cos(2x) = cos²(x) − sin²(x). Therefore sin²(x) − cos²(x) + cos(2x) = 0 for every x ≥ 0. The coefficients (1, −1, 1) are not all zero.\n\nThe three functions are linearly dependent on x ≥ 0."
  },
  "ode-3-2-1": {
    "level": "Beginner",
    "solution": "The characteristic polynomial is r³ + 9r = r(r² + 9). Its roots are 0 and ±3i. The root 0 contributes a constant, and the complex pair contributes cos(3x) and sin(3x).\n\nGeneral solution: y = C₁ + C₂cos(3x) + C₃sin(3x)."
  },
  "ode-3-2-2": {
    "level": "Advanced",
    "solution": "The characteristic polynomial is r⁴ + 2r³ + 1. Testing r = −1 and dividing gives (r + 1)(r³ + r² − r + 1). The remaining cubic has no rational roots. Its three roots are approximately −1.839287 and 0.419643 ± 0.606291i.\n\nLet α be the real root of that cubic, and β ± iγ its complex roots, with γ > 0. The four roots are distinct. The two real roots produce exponential modes, and the complex pair produces a sine and cosine with a common exponential factor.\n\nGeneral solution: y = C₁e^(−x) + C₂e^(αx) + e^(βx)[C₃cos(γx) + C₄sin(γx)]. The root definitions give the exact solution. The decimals are for evaluation."
  },
  "ode-3-2-4": {
    "level": "Intermediate",
    "solution": "Factor the characteristic polynomial by grouping:\nr³ − r² − r + 1 = r²(r − 1) − (r − 1) = (r − 1)²(r + 1).\n\nThe double root r = 1 contributes e^x and xe^x. The simple root r = −1 contributes e^(−x).\n\nGeneral solution: y = (C₁ + C₂x)e^x + C₃e^(−x)."
  },
  "ode-3-2-5": {
    "level": "Intermediate",
    "solution": "Treat the characteristic polynomial as a quadratic in r²:\nr⁴ + 10r² + 9 = (r² + 1)(r² + 9).\n\nThe distinct root pairs ±i and ±3i give two sine/cosine pairs.\n\nGeneral solution: y = C₁cos(x) + C₂sin(x) + C₃cos(3x) + C₄sin(3x)."
  },
  "ode-3-2-11": {
    "level": "Advanced",
    "solution": "The characteristic polynomial factors as (r² − 25)(r² + 16), with roots ±5 and ±4i. Write y = A cosh(5x) + B sinh(5x) + C cos(4x) + E sin(4x).\n\nThe even-order initial conditions give A + C = 0 and 25A − 16C = 41, hence A = 1 and C = −1. The odd-order conditions give 5B + 4E = 0 and 125B − 64E = 0, hence B = E = 0.\n\nSolution: y = cosh(5x) − cos(4x)."
  },
  "ode-3-3-1": {
    "level": "Advanced",
    "solution": "The operator is (D − I)³, so yₕ = (C₁ + C₂x + C₃x²)e^x. For the e^x forcing, the root r = 1 has multiplicity three. Try yₚ₁ = Ax³e^x. Applying (D − I)³ is equivalent to differentiating Ax³ three times and multiplying by e^x, so 6A = 1.\n\nFor the remaining forcing −x − 1, try yₚ₂ = Bx + E. Applying the operator gives −Bx + 3B − E. Matching gives B = 1 and E = 4.\n\nGeneral solution: y = e^x(C₁ + C₂x + C₃x² + x³/6) + x + 4."
  },
  "ode-3-3-3": {
    "level": "Intermediate",
    "solution": "The characteristic polynomial is r⁴ + 5r² + 4 = (r² + 1)(r² + 4), so the homogeneous modes are cos(x), sin(x), cos(2x), and sin(2x).\n\nTry yₚ = A sinh(2x). The second and fourth derivatives of sinh(2x) are 4sinh(2x) and 16sinh(2x). Thus applying the operator gives (16 + 20 + 4)A sinh(2x). Matching 3.5 sinh(2x) yields A = 7/80.\n\nGeneral solution: y = C₁cos(x) + C₂sin(x) + C₃cos(2x) + C₄sin(2x) + (7/80)sinh(2x)."
  },
  "ode-3-3-5": {
    "level": "Advanced",
    "solution": "On an interval avoiding zero, the homogeneous Euler equation gives m(m − 1)(m − 2) + 2m(m − 1) − m + 1 = (m − 1)²(m + 1). Use y₁ = x, y₂ = x ln|x|, and y₃ = 1/x. After division by x³, the forcing is x⁻⁵.\n\nIn variation of parameters, impose Σuₖ′yₖ = 0, Σuₖ′yₖ′ = 0, and Σuₖ′yₖ″ = x⁻⁵. The coefficient matrix has Wronskian 4/x². Solving gives u₁′ = −(2 ln|x| + 1)/(4x⁴), u₂′ = 1/(2x⁴), and u₃′ = 1/(4x²).\n\nTake u₁ = (6 ln|x| + 5)/(36x³), u₂ = −1/(6x³), and u₃ = −1/(4x). In yₚ = u₁y₁ + u₂y₂ + u₃y₃ the logarithms cancel, leaving yₚ = −1/(9x²).\n\nGeneral solution: y = C₁x + C₂x ln|x| + C₃/x − 1/(9x²), on either x > 0 or x < 0."
  },
  "ode-3-3-9": {
    "level": "Intermediate",
    "solution": "The homogeneous characteristic polynomial is (r² + 1)(r² + 4). Its roots are ±i and ±2i, so the frequency 4 in the forcing is nonresonant.\n\nTry yₚ = A sin(4x). The second derivative multiplies sin(4x) by −16 and the fourth derivative multiplies it by 256. Thus the full operator multiplies it by 256 − 80 + 4 = 180, so A = 90/180 = 1/2.\n\nGeneral solution: y = C₁cos(x) + C₂sin(x) + C₃cos(2x) + C₄sin(2x) + (1/2)sin(4x)."
  },
  "ode-3-3-15": {
    "level": "Advanced",
    "solution": "For x > 0, put t = ln(x) and u(t) = y(e^t). Then xy′ = u′ and x²y″ = u″ − u′, where the derivatives of u are with respect to t. The equation becomes u″ − 4u′ + 3u = 3t − 4.\n\nThe characteristic polynomial is (r − 1)(r − 3), so uₕ = C₁e^t + C₂e^(3t). Try uₚ = At + B. Matching 3At + 3B − 4A to 3t − 4 gives A = 1 and B = 0.\n\nGeneral solution: y = C₁x + C₂x³ + ln(x), for x > 0."
  },
  "la-linear-systems-spaces-1": {
    "level": "Beginner",
    "solution": "The second row is twice the first, so Ax = 0 reduces to x₁ + 2x₂ − x₃ = 0. The variables x₂ and x₃ are free. With x₂ = s and x₃ = t, x = s(−2, 1, 0)ᵀ + t(1, 0, 1)ᵀ.\n\nThe two vectors form a basis of N(A), so dim N(A) = 2."
  },
  "la-linear-systems-spaces-2": {
    "level": "Beginner",
    "solution": "Subtract the third equation from the first to get 2x₂ = 2. Then x₂ = 1 and x₁ + x₃ = 2. Setting x₃ = 0 gives xₚ = (2, 1, 0)ᵀ.\n\nIn the homogeneous system, x₂ = 0 and x₁ = −x₃, so N(A) = span{(−1, 0, 1)ᵀ}. The complete solution is x = (2, 1, 0)ᵀ + t(−1, 0, 1)ᵀ, t ∈ ℝ.\n\nIf the second entry of b is 5, the system is inconsistent: the second row of A is twice the first, so its right-hand side must be 6."
  },
  "la-linear-systems-spaces-3": {
    "level": "Beginner",
    "solution": "The RREF has nonzero rows (1, 2, 0, 1) and (0, 0, 1, −1), with pivots in columns 1 and 3. Write aⱼ for column j of the original A.\n\nA basis of C(A) is {a₁, a₃} = {(1, 2, 1)ᵀ, (0, 1, 1)ᵀ}. The other columns satisfy a₂ = 2a₁ and a₄ = a₁ − a₃."
  },
  "la-linear-systems-spaces-4": {
    "level": "Intermediate",
    "solution": "The first two equations force x₁ = b₁ and x₂ = b₂. Thus b belongs to C(A) exactly when b₃ = 2b₁ − b₂.\n\nFor u, 2(2) − 3 = 1, so u ∈ C(A) and the unique solution is x = (2, 3)ᵀ. For v, 2(1) − 1 = 1 ≠ 2, so v ∉ C(A) and there is no solution."
  },
  "la-linear-systems-spaces-5": {
    "level": "Intermediate",
    "solution": "Reducing [A | b] gives x₁ + 2x₂ + x₄ = 2 and x₃ + x₄ = 1. The pivot columns are 1 and 3. The corresponding original columns (1, 2, −1)ᵀ and (−1, 0, 2)ᵀ are a basis of C(A), so dim C(A) = 2.\n\nIn Ax = 0, set x₂ = s and x₄ = t. Then x₁ = −2s − t and x₃ = −t. The vectors (−2, 1, 0, 0)ᵀ and (−1, 0, −1, 1)ᵀ form a basis of N(A), and dim N(A) = 2.\n\nSetting both free variables to zero in Ax = b gives xₚ = (2, 0, 1, 0)ᵀ. The complete solution is x = (2, 0, 1, 0)ᵀ + s(−2, 1, 0, 0)ᵀ + t(−1, 0, −1, 1)ᵀ, with s, t ∈ ℝ. The free parameters are coordinates in the null space. Here dim C(A) also equals 2, but the dimension that always counts the free parameters is dim N(A)."
  },
  "la-linear-systems-spaces-6": {
    "level": "Intermediate",
    "solution": "For t ∉ {0, 1}, the diagonal entries of the triangular matrix are all nonzero, so back substitution gives exactly one solution.\n\nFor t = 1, the last equation is 0 = −1, so there is no solution. For t = 0, the last two equations both give x₃ = 1. The first gives x₁ = 3 − 2x₂. Thus there are infinitely many solutions: x = (3, 0, 1)ᵀ + s(−2, 1, 0)ᵀ, s ∈ ℝ."
  },
  "la-linear-systems-spaces-7": {
    "level": "Advanced",
    "solution": "(a) True. Each elementary row operation is reversible, so Ax = 0 and RREF(A)x = 0 have exactly the same solutions. The same applies to B.\n\n(b) False. Take A = [[1, 0], [0, 0]] and B = [[0, 0], [1, 0]]. They differ by a row swap, but C(A) is the first coordinate axis and C(B) is the second.\n\n(c) True. Both column space dimensions equal the rank, which is the number of pivots in their common RREF."
  },
  "la-linear-systems-spaces-8": {
    "level": "Advanced",
    "solution": "Write aⱼ for column j of A. The required null vectors force a₁ = a₂ and a₃ = −a₂. Choose u = (1, 0, 1)ᵀ and v = (0, 1, 1)ᵀ, and set A = [u, u, −u, v] = [[1, 1, −1, 0], [0, 0, 0, 1], [1, 1, −1, 1]].\n\nIts column space is span{u, v}. Since u and v are independent, Ax = 0 is equivalent to x₁ + x₂ − x₃ = 0 and x₄ = 0. Both given vectors are in N(A) and are independent. Rank 2 gives nullity 2, so they span N(A).\n\nSince (2, 3, 5)ᵀ = 2u + 3v, a particular solution is (2, 0, 0, 3)ᵀ. The complete solution is x = (2, 0, 0, 3)ᵀ + s(1, −1, 0, 0)ᵀ + t(0, 1, 1, 0)ᵀ, s, t ∈ ℝ."
  },
  "practice-laplace-transforms-1": {
    "level": "Beginner",
    "solution": "By definition,\n\n\\[F(s)=\\int_0^\\infty t e^{-(s+2)t}\\,dt.\\]\n\nFor \\(s>-2\\), let \\(a=s+2>0\\). Integration by parts on \\([0,R]\\) gives\n\n\\[\\int_0^R t e^{-at}\\,dt=-\\frac{R e^{-aR}}{a}+\\frac{1-e^{-aR}}{a^2}.\\]\n\nAs \\(R\\to\\infty\\), both terms containing \\(e^{-aR}\\) vanish. Hence\n\n\\[F(s)=\\frac{1}{(s+2)^2},\\qquad s>-2.\\]\n\nIf \\(s\\le -2\\), the integrand is at least \\(t\\) for \\(t\\ge 0\\), so the integral diverges."
  },
  "practice-laplace-transforms-2": {
    "level": "Intermediate",
    "solution": "Write \\(F(s)=\\frac{A}{s+1}+\\frac{B}{(s+1)^2}+\\frac{C}{s+3}\\). Clearing denominators gives\n\n\\[2s+5=A(s+1)(s+3)+B(s+3)+C(s+1)^2.\\]\n\nSubstitute \\(s=-1\\) and \\(s=-3\\) to obtain \\(B=\\frac32\\) and \\(C=-\\frac14\\). The coefficient of \\(s^2\\) then gives \\(A+C=0\\), so \\(A=\\frac14\\).\n\nUsing the transform pairs for \\(e^{-at}\\) and \\(t e^{-at}\\), we obtain\n\n\\[f(t)=\\frac14 e^{-t}+\\frac32 t e^{-t}-\\frac14 e^{-3t}.\\]"
  },
  "practice-laplace-transforms-3": {
    "level": "Intermediate",
    "solution": "The ramp begins at \\(t=1\\). At \\(t=3\\), cancel the entire ramp, whose value there is \\(2\\):\n\n\\[f(t)=u(t-1)(t-1)-u(t-3)\\big((t-3)+2\\big).\\]\n\nThe factors multiplying the unit steps are now written in terms of the corresponding shifted times. Apply \\(\\mathcal{L}\\{u(t-a)g(t-a)\\}=e^{-as}\\mathcal{L}\\{g(t)\\}\\), with \\(g(t)=t\\) for the first term and \\(g(t)=t+2\\) for the second:\n\n\\[F(s)=\\frac{e^{-s}}{s^2}-e^{-3s}\\left(\\frac{1}{s^2}+\\frac{2}{s}\\right),\\qquad s>0.\\]"
  },
  "practice-laplace-transforms-4": {
    "level": "Advanced",
    "solution": "Let \\(Y(s)=\\mathcal{L}\\{y(t)\\}\\). In the transformed equation, the derivative terms contribute \\(s^2Y-s\\) and \\(3sY-3\\). Therefore\n\n\\[(s+1)(s+2)Y=s+3+\\frac{4e^{-2s}}{s}.\\]\n\nThe two rational factors have the partial fraction decompositions\n\n\\[\\frac{s+3}{(s+1)(s+2)}=\\frac{2}{s+1}-\\frac{1}{s+2},\\]\n\n\\[\\frac{4}{s(s+1)(s+2)}=\\frac{2}{s}-\\frac{4}{s+1}+\\frac{2}{s+2}.\\]\n\nInvert the first factor directly. For the second, the multiplier \\(e^{-2s}\\) delays its inverse by two time units. The solution is\n\n\\[y(t)=2e^{-t}-e^{-2t}+u(t-2)g(t-2),\\]\n\n\\[g(\\tau)=2-4e^{-\\tau}+2e^{-2\\tau}.\\]\n\nThe delayed term is zero near \\(t=0\\), so the solution has \\(y(0)=1\\) and \\(y'(0)=0\\). Also, \\(g(0)=g'(0)=0\\), so \\(y\\) and \\(y'\\) are continuous at the switch."
  }
};

