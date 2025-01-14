var documenterSearchIndex = {"docs":
[{"location":"cft_data/#Basic-types","page":"Basic types","title":"Basic types","text":"","category":"section"},{"location":"cft_data/","page":"Basic types","title":"Basic types","text":"The package has a few types to represent objects in a Virasoro CFT:","category":"page"},{"location":"cft_data/","page":"Basic types","title":"Basic types","text":"CentralCharges\nConformalDimensions\nFields","category":"page"},{"location":"cft_data/#Central-charges","page":"Basic types","title":"Central charges","text":"","category":"section"},{"location":"cft_data/","page":"Basic types","title":"Basic types","text":"We parametrise the central charge of our theories in terms of variables c, B, b or \\beta related by","category":"page"},{"location":"cft_data/","page":"Basic types","title":"Basic types","text":"c = 13 + 6B + 6 B^-1 quad  quad B = b^2 = -beta^2\nquad B = fracc-13 pm sqrt(c-1)(c-25)12","category":"page"},{"location":"cft_data/","page":"Basic types","title":"Basic types","text":"By convention we keep beta = ib. In O(n) and U(n) models the central charge is related to n via","category":"page"},{"location":"cft_data/","page":"Basic types","title":"Basic types","text":"n = - 2 cos(pi beta^2)","category":"page"},{"location":"cft_data/","page":"Basic types","title":"Basic types","text":"The program allows to conveniently create central charges from any of these four parameters, and to retrieve the value of any parameter:","category":"page"},{"location":"cft_data/","page":"Basic types","title":"Basic types","text":"CentralCharge\nCentralCharge(; β=missing, c=missing, B=missing, b=missing)","category":"page"},{"location":"cft_data/#BootstrapVirasoro.CentralCharge","page":"Basic types","title":"BootstrapVirasoro.CentralCharge","text":"CentralCharge{T}\n\nType representing a central charge. T is expected to be a real or complex number, of standard or arbitrary precision. The supported parameters are c, β, b, B.\n\nExamples\n\njulia> c = CentralCharge(c = 0.7)\nc = 0.7000000000000011 + 0.0im, β = -0.894427190999916 - 0.0im\n\njulia> c.b\n-0.0 + 0.894427190999916im\n\njulia> c.n\n1.6180339887498953 + 0.0im\n\n\n\n\n\n","category":"type"},{"location":"cft_data/#BootstrapVirasoro.CentralCharge-Tuple{}","page":"Basic types","title":"BootstrapVirasoro.CentralCharge","text":"CentralCharge(parameter = value)\n\nConstructor function for the CentralCharge type.\n\nGiven one of the four parameters c, b, β, B and its value, creates an object CentralCharge{T}.\n\nExample\n\njulia> setprecision(BigFloat, 20, base=10);\n\njulia> CentralCharge(B = 0.5)\nc = 27.999999999999996 + 0.0im, β = 0.0 - 0.7071067811865476im\n\njulia> CentralCharge(β = 0.7)\nc = -2.184897959183676 + 0.0im, β = -0.7 - 0.0im\n\njulia> CentralCharge(c = big\"0.1\" + 0.2im)\nc = 0.09999999999999999991326 + 0.2000000000000000111158im, β = -0.8237591041762989640376 - 0.01729590504934815486866im\n\n\n\n\n\n","category":"method"},{"location":"cft_data/#Conformal-Dimensions","page":"Basic types","title":"Conformal Dimensions","text":"","category":"section"},{"location":"cft_data/","page":"Basic types","title":"Basic types","text":"We parametrise the conformal dimensions in terms of variables Delta P p delta, related by","category":"page"},{"location":"cft_data/","page":"Basic types","title":"Basic types","text":"Delta = fracc-124 + delta  quad  quad delta = P^2 = -p^2","category":"page"},{"location":"cft_data/","page":"Basic types","title":"Basic types","text":"The variable P is called the momentum, and Delta is the eigenvalue of the dilation operator. By convention, we always keep P=ip. Moreover, we introduce the following parametrisation of dimensions in terms of Kac indices r s:","category":"page"},{"location":"cft_data/","page":"Basic types","title":"Basic types","text":"P_(rs)=frac12(beta r - beta^-1s)","category":"page"},{"location":"cft_data/","page":"Basic types","title":"Basic types","text":"where rs are arbitrary numbers. This convention is different from the one in Sylvain\\'s code, but similar to our more recent conventions, such as in Sylvain's review on solvable CFTs.","category":"page"},{"location":"cft_data/","page":"Basic types","title":"Basic types","text":"The program lets us define these objects and access the various parametrisations:","category":"page"},{"location":"cft_data/","page":"Basic types","title":"Basic types","text":"ConformalDimension\nConformalDimension(\n    c::CentralCharge;\n    Kac=missing, r=missing, s=missing,\n    Δ=missing, δ=missing, P=missing, p=missing\n)","category":"page"},{"location":"cft_data/#BootstrapVirasoro.ConformalDimension","page":"Basic types","title":"BootstrapVirasoro.ConformalDimension","text":"ConformalDimension{T}\n\nType for encoding a conformal dimension. The supported parameters are Δ, δ, P, p, w, or the Kac indices r and s.\n\nExamples\n\njulia> c = CentralCharge(:c, 0.5);\n\njulia> d1 = ConformalDimension(c, P = 1.2+0.1im)\nConformalDimension{ComplexF64} with\nΔ = 1.4091666666666667 + 0.24im, P = 1.2 + 0.1im\n\njulia> d2 = ConformalDimension(c, r=2, s=3//2)\nConformalDimension{ComplexF64} with Kac indices r = 2//1, s = 3//2\n\njulia> d1.P\n1.2 + 0.1im\n\njulia> d2.Δ\n-0.020833333333333332 + 0.0im\n\njulia> d1 + d2\nConformalDimension{ComplexF64} with\nΔ = 1.3883333333333332 + 0.24im, P = 1.1913489935345947 + 0.10072615216131914im\n\njulia> d1.w\n2.05874441299789 - 0.06772184182090507im\n\n\n\n\n\n","category":"type"},{"location":"cft_data/#BootstrapVirasoro.ConformalDimension-Tuple{CentralCharge}","page":"Basic types","title":"BootstrapVirasoro.ConformalDimension","text":"ConformalDimension(c, parameter, value; Kac=false, r=0, s=0)\n\nConstructor function for the ConformalDimension type.\n\nExamples\n\njulia> c = CentralCharge(β = 0.3im)\nc = 80.20666666666665 + 0.0im, β = 0.0 - 0.3im\n\njulia> d1 = ConformalDimension(c, δ = 0.5)\nConformalDimension{ComplexF64} with\nΔ = 3.800277777777777 + 0.0im, P = 0.7071067811865476\n\njulia> d2 = ConformalDimension(c, r=3//2, s=2//3)\nConformalDimension{ComplexF64} with Kac indices r = 3//2, s = 2//3\n\n\n\n\n\n","category":"method"},{"location":"cft_data/#Fields","page":"Basic types","title":"Fields","text":"","category":"section"},{"location":"cft_data/","page":"Basic types","title":"Basic types","text":"For our purposes, a field is the data of left and right conformal dimensions. We denote V_(r s) a field with left and right dimensions (Delta_(r s) Delta_(r -s)).","category":"page"},{"location":"cft_data/","page":"Basic types","title":"Basic types","text":"The program exposes a Field struct and convenient constructors:","category":"page"},{"location":"cft_data/","page":"Basic types","title":"Basic types","text":"Field\nField(\n    c::CentralCharge,\n    sym::Symbol,\n    dim;\n    Kac=false, r=0, s=0,\n    degenerate=false, diagonal=false\n)","category":"page"},{"location":"cft_data/#BootstrapVirasoro.Field","page":"Basic types","title":"BootstrapVirasoro.Field","text":"Field{T}\n\nObject representing a conformal field. Contains the conformal dimensions, and flags saying whether the field has rational Kac indices and/or is diagonal. The user can access different parametrisations of the left and  right conformal dimensions, and Kac indices.\n\nExamples\n\njulia> c = CentralCharge(B = 0.5)\nc = 27.999999999999996 + 0.0im, β = 0.0 - 0.7071067811865476im\n\njulia> V = Field(c, r=0, s=2//3)\nNon-diagonal Field{ComplexF64}\nleft: ConformalDimension{ComplexF64} with Kac indices r = 0//1, s = 2//3\nright: ConformalDimension{ComplexF64} with Kac indices r = 0//1, s = -2//3\n\njulia> V.r\n0//1\n\njulia> V.s\n2//3\n\njulia> V.δ\n(-0.22222222222222215 - 0.0im, -0.22222222222222215 + 0.0im)\n\njulia> V.δ[:left]\n-0.22222222222222215 - 0.0im\n\njulia> V.p[:right]\n0.4714045207910316 + 0.0im\n\njulia> V2 = Field(c, δ = 0.5, diagonal=true)\nDiagonal Field{ComplexF64} with ConformalDimension{ComplexF64} with\nΔ = 1.625 + 0.0im, P = 0.7071067811865476\n\n\n\n\n\n","category":"type"},{"location":"cft_data/#BootstrapVirasoro.Field-Tuple{CentralCharge, Symbol, Any}","page":"Basic types","title":"BootstrapVirasoro.Field","text":"    Field(charge, parameter = value; kwargs)\n    Field(charge, r = r, s = s)\n    Field((dim_left, dim_right))\n    Field(dim_left, dim_right)\n    Field(dim) # diagonal field\n\nConstructor function for the Field type.\n\nGiven a charge charge, one of the four parameters Δ, δ, P, p and two values, create an object Field{T} (where T is the type of the values in charge) that represents a field of left and right dimensions given by leftvalue and rightvalue in the chosen parametrisation.\n\nkeyword arguments:\n\nr::Rational,s::Rational: used in conjunction to Kac=true, must be given rational\n\nvalues. By convention V_(rs) has left and right momenta (P_(rs) P_(r-s)).\n\ndiagonal::Bool: set to true to get a diagonal field;\n\nExamples\n\njulia> setprecision(BigFloat, 20, base=10);\n\njulia> c = CentralCharge(β = big\"0.5\");\n\njulia> V = Field(c, r=0, s=1)\nNon-diagonal Field{Complex{BigFloat}}\nleft: ConformalDimension{Complex{BigFloat}} with Kac indices r = 0, s = 1\nright: ConformalDimension{Complex{BigFloat}} with Kac indices r = 0, s = -1\n\njulia> V.Δ\n(0.4375 + 0.0im, 0.4375 + 0.0im)\n\njulia> V.P[:left]\n1.0\n\njulia> V.p[:right]\n-0.0 + 1.0im\n\njulia> V2 = Field(c, :P, 0.42, diagonal=true)\nDiagonal Field{Complex{BigFloat}} with ConformalDimension{Complex{BigFloat}} with\nΔ = -0.3861000000000000130545 + 0.0im, P = 0.4199999999999999844569\n\njulia> V3 = Field(c, degenerate=true, r=4, s=3//4)\nDiagonal Field{Complex{BigFloat}} with ConformalDimension{Complex{BigFloat}} with Kac indices r = 4//1, s = 3//4\n\n\n\n\n\n","category":"method"},{"location":"cft_data/#Spectra","page":"Basic types","title":"Spectra","text":"","category":"section"},{"location":"cft_data/","page":"Basic types","title":"Basic types","text":"TODO","category":"page"},{"location":"installation/#Installation","page":"Installation","title":"Installation","text":"","category":"section"},{"location":"installation/","page":"Installation","title":"Installation","text":"To install this package, run","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"using Pkg; Pkg.add(\"https://github.com/Paul-Roux-Phys/BootstrapVirasoro.git\")","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"in a Julia script, or download the code from the repo, put it somewhere where Julia can see the BootstrapVirasoro module and do","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"julia> ]add BootstrapVirasoro","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"in a Julia REPL.","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"The module is then accessible via","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"using BootstrapVirasoro","category":"page"},{"location":"conformal_blocks/#Correlation-functions-and-conformal-blocks","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"","category":"section"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"The program is capable of computing chiral and non-chiral Virasoro blocks for four-point functions on the sphere and for one-point functions on the torus, by Zamalodchikov's recursive formula.","category":"page"},{"location":"conformal_blocks/#Chiral-blocks-and-Zamolodchikov's-recursion-formula","page":"Correlation functions and conformal blocks","title":"Chiral blocks and Zamolodchikov's recursion formula","text":"","category":"section"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"Blocks can be computed efficiently thanks to Zamolodchikov's recursion.","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"They are expressed as series in a variable q related to x through","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"begincases\nx = fractheta_2(q)^4theta_3(q)^4 quad q = e^-pifracK(1-x) K(x) \n    text for four-point blocks on the sphere \nq = e^2ipi tau text for one-point blocks on the torus\nendcases","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"where","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"theta_3(q) = sum_ninmathbbZ q^n^2 quad \nquad theta_2(q) = 2q^frac14sum_n=0^infty q^n(n+1)","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"are Jacobi special theta-functions, K(x) is the elliptic K function, and tau is the modulus of the torus.","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"xfromq","category":"page"},{"location":"conformal_blocks/#BootstrapVirasoro.xfromq","page":"Correlation functions and conformal blocks","title":"BootstrapVirasoro.xfromq","text":"Cross ratio x from the nome q\n\n\n\n\n\n","category":"function"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"qfromx","category":"page"},{"location":"conformal_blocks/#BootstrapVirasoro.qfromx","page":"Correlation functions and conformal blocks","title":"BootstrapVirasoro.qfromx","text":"Nome q from the cross-ratio x\n\n\n\n\n\n","category":"function"},{"location":"conformal_blocks/#Four-point-blocks-on-the-sphere","page":"Correlation functions and conformal blocks","title":"Four-point blocks on the sphere","text":"","category":"section"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"In terms of these variables, the chiral s-channel sphere four point conformal block is","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"beginalign\nmathcalF^(s)_delta(c  Delta_1 dots Delta_4  x) =\nx^E_0 (1-x)^E_1 theta_3(q)^-4E_2\n(16q)^delta H_delta(c  Delta_1dots Delta_4  q)\nendalign","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"where we use the exponents","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"E_0 = -delta_1-delta_2-fracc-124 quad  quad E_1 = \n-delta_1-delta_4-fracc-124 quad \nquad E_2 = delta_1+delta_2+delta_3+delta_4+fracc-124","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"The non-trivial coefficient is the series","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"H_delta(q) = 1 + sum_N=1^N_max sum_mnleq N C_mn^N\n frac(16q)^Ndelta-delta_(mn)","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"Where the coefficient C_mn^N is defined by the recursive formula","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"C^N_mn = R_mnleft(delta_N-mn0 +\nsum_mnleq N-mn\nfracC^N-mn_mndelta_(m-n)-delta_(mn) right)","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"And the coefficients R_mn can be written","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"beginalign\n R_mn = frac12frac1D_mn\nprod_roverset2= 1-m^m-1\nprod_soverset2=1-n^n-1\nsqrt(delta_2-delta_1)^2 -2delta_(rs)(delta_1+delta_2) + delta_(rs)^2nonumber\nsqrt(delta_3-delta_4)^2 -2delta_(rs)(delta_3+delta_4) + delta_(rs)^2\nendalign","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"We do not actually take square roots, because each factor appears twice, except the (rs)=(00) factor which is however a perfect square. The normalization factor is","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"beginequation\nD_mn = mn prod_r=1^m-1 r^2B left(r^2B - fracn^2Bright)\nprod_s=1^n-1 fracs^2Bleft(fracs^2B - m^2Bright)\nprod_r=1^m-1 prod_s=1^n-1 left(r^2B -fracs^2B right)^2\nendequation","category":"page"},{"location":"conformal_blocks/#One-point-blocks-on-the-torus","page":"Correlation functions and conformal blocks","title":"One-point blocks on the torus","text":"","category":"section"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"A similar formula holds for torus one-point blocks:","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"beginalign\n    mathcal F_Delta(tau c Delta_1  x) = fracq^deltaeta(q)\n    H^texttorus_Delta(tau c Delta_1  q)\nendalign","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"The recursion formula for H^texttorus_Delta(tau c Delta_1  q) is","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"beginalign\n  H_Delta^texttorus (tau c Delta_1  q) = 1 + sum_N=1^N_textmax\n  sum C^N texttorus_mn fracq^Ndelta - delta_(mn)\nendalign","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"The coefficients C_mn^Ntexttorus have the recursive representation","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"beginequation\nC^Ntexttorus_mn = R^texttorus_mnleft(delta_N-mn0 +\nsum_mnleq N-mn fracC^N-mn_mndelta_(m-n)-delta_(mn) right)\nendequation","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"An expression for the R_mn^texttorus can be found on  this wikipedia article. It can be rewritten","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"R_mn^texttorus = frac12 D_mn prod_roverset2=1-2m^2m-1\nprod_soverset2=1-2n^2n-1 sqrtdelta_(rs) - delta_1","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"where we do not actually take square roots, because each factor appears twice. The normalization factor is the same D_mn as in the four-point case.","category":"page"},{"location":"conformal_blocks/#The-Correlation-type","page":"Correlation functions and conformal blocks","title":"The Correlation type","text":"","category":"section"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"To prevent recomputation of the blocks' residues, which are independent on the channel field, the user must create a struct Correlation. If passed one (resp. four) ConformalDimension object(s), and an integer Nmax, the Correlation object will contain all residues of the corresponding blocks, up to order Nmax. The Correlation struct also serves as a convenient way to bundle together external parameters of blocks.","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"Correlation\nCorrelation()","category":"page"},{"location":"conformal_blocks/#BootstrapVirasoro.Correlation","page":"Correlation functions and conformal blocks","title":"BootstrapVirasoro.Correlation","text":"Correlation{T}\n\nAbstract type for holding data relevant to the computation of a correlation function:\n\nexternal fields\nCoefficients R_mn, possibly left and right and for different channels\nCoefficients R^textreg_m n when R_m n vanishes\nCoefficients C^N_m n, possibly left and right and for different channels\n\nIt is also possible to access the central charge, left or right parts of the correlation if it is non chiral, etc. See examples.\n\nExamples\n\njulia> c = CentralCharge(β = sqrt(2))\nc = -2.0000000000000027 + 0.0im, β = -1.4142135623730951 - 0.0im\n\njulia> V1 = Field(c, r=2, s=3//2)\nNon-diagonal Field{ComplexF64}\nleft: ConformalDimension{ComplexF64} with Kac indices r = 2//1, s = 3//2\nright: ConformalDimension{ComplexF64} with Kac indices r = 2//1, s = -3//2\n\njulia> co = Correlation(V1, V1, V1, V1, 10)\nCorrelationNonChiral with external fields\nNon-diagonal Field{ComplexF64}\nleft: ConformalDimension{ComplexF64} with Kac indices r = 2//1, s = 3//2\nright: ConformalDimension{ComplexF64} with Kac indices r = 2//1, s = -3//2\nNon-diagonal Field{ComplexF64}\nleft: ConformalDimension{ComplexF64} with Kac indices r = 2//1, s = 3//2\nright: ConformalDimension{ComplexF64} with Kac indices r = 2//1, s = -3//2\nNon-diagonal Field{ComplexF64}\nleft: ConformalDimension{ComplexF64} with Kac indices r = 2//1, s = 3//2\nright: ConformalDimension{ComplexF64} with Kac indices r = 2//1, s = -3//2\nNon-diagonal Field{ComplexF64}\nleft: ConformalDimension{ComplexF64} with Kac indices r = 2//1, s = 3//2\nright: ConformalDimension{ComplexF64} with Kac indices r = 2//1, s = -3//2\n\n\njulia> co._Rmn[:left][:s]\nDict{Tuple{Int64, Int64}, ComplexF64} with 17 entries:\n  (1, 2)  => -0.046875-0.0im\n  (2, 5)  => -0.0-0.0im\n  (1, 4)  => 5.93736e12+0.0im\n  (3, 2)  => -0.0-0.0im\n  (4, 1)  => 0.000145397+0.0im\n  (2, 1)  => 0.143555-0.0im\n  (10, 1) => 9.57818e-12+0.0im\n  (4, 2)  => -0.0-0.0im\n  (2, 2)  => -5.93736e12-0.0im\n  (1, 6)  => 1.78429e-20+0.0im\n  (2, 3)  => -0.0-0.0im\n  (8, 1)  => 2.23115e-9+0.0im\n  (2, 4)  => 8.37054e-7-0.0im\n  (5, 2)  => -0.0-0.0im\n  (6, 1)  => 5.3357e-7+0.0im\n  (1, 8)  => 2.84603e-23+0.0im\n  (1, 10) => 7.64062e-26+0.0im\n\njulia> co.c\nc = -2.0000000000000027 + 0.0im, β = -1.4142135623730951 - 0.0im\n\njulia> co.fields\n(Non-diagonal Field{ComplexF64}\nleft: ConformalDimension{ComplexF64} with Kac indices r = 2//1, s = 3//2\nright: ConformalDimension{ComplexF64} with Kac indices r = 2//1, s = -3//2, Non-diagonal Field{ComplexF64}\nleft: ConformalDimension{ComplexF64} with Kac indices r = 2//1, s = 3//2\nright: ConformalDimension{ComplexF64} with Kac indices r = 2//1, s = -3//2, Non-diagonal Field{ComplexF64}\nleft: ConformalDimension{ComplexF64} with Kac indices r = 2//1, s = 3//2\nright: ConformalDimension{ComplexF64} with Kac indices r = 2//1, s = -3//2, Non-diagonal Field{ComplexF64}\nleft: ConformalDimension{ComplexF64} with Kac indices r = 2//1, s = 3//2\nright: ConformalDimension{ComplexF64} with Kac indices r = 2//1, s = -3//2)\n\njulia> co[:left]\nChiral correlation function with external dimensions\nConformalDimension{ComplexF64} with Kac indices r = 2//1, s = 3//2\nConformalDimension{ComplexF64} with Kac indices r = 2//1, s = 3//2\nConformalDimension{ComplexF64} with Kac indices r = 2//1, s = 3//2\nConformalDimension{ComplexF64} with Kac indices r = 2//1, s = 3//2\n\n\n\n\n\n\n","category":"type"},{"location":"conformal_blocks/#BootstrapVirasoro.Correlation-Tuple{}","page":"Correlation functions and conformal blocks","title":"BootstrapVirasoro.Correlation","text":"Correlation(ds::ExtDimensions, Nmax::Int)::CorrelationChiral\nCorrelation(V::ExtFields, Nmax::Int)::CorrelationNonChiral\nCorrelation(Vs::ExtFields, lr::Symbol, Nmax::Int)::CorrelationNonChiral\nCorrelation(d1::ConformalDimension, d2, d3, d4, Nmax::Int)::CorrelationChiral\nCorrelation(V1::Field, V2, V3, V4, Nmax::Int)::CorrelationNonChiral\nCorrelation(V1::Field, V2, V3, V4, lr::Symbol, Nmax::Int)::CorrelationChiral\nCorrelation(d::ConformalDimension, Nmax::Int)::CorrelationChiral\nCorrelation(V::Field, Nmax::Int)::CorrelationNonChiral\nCorrelation(V::Field, lr::Symbol, Nmax::Int)::CorrelationChiral\nCorrelation(co_left::CorrelationChiral, co_right::CorrelationChiral)::CorrelationNonChiral\n\nConstructor function for the Correlation abstract type. Construct a correlation from various combinations of parameters. Depending on the arguments, the output can be a CorrelationChiral or CorrelationNonChiral object, as indicated above.\n\nExamples\n\njulia> c = CentralCharge(c = 0.5)\nc = 0.5 + 0.0im, β = -0.8660254037844386 - 0.0im\n\njulia> V1 = Field(c, r=1, s=0);\n\njulia> V2 = Field(c, r=2, s=1);\n\njulia> co = Correlation(V1, V2, V2, V1, 10)\nCorrelationNonChiral with external fields\nNon-diagonal Field{ComplexF64}\nleft: ConformalDimension{ComplexF64} with Kac indices r = 1, s = 0\nright: ConformalDimension{ComplexF64} with Kac indices r = 1, s = 0\nNon-diagonal Field{ComplexF64}\nleft: ConformalDimension{ComplexF64} with Kac indices r = 2, s = 1\nright: ConformalDimension{ComplexF64} with Kac indices r = 2, s = -1\nNon-diagonal Field{ComplexF64}\nleft: ConformalDimension{ComplexF64} with Kac indices r = 2, s = 1\nright: ConformalDimension{ComplexF64} with Kac indices r = 2, s = -1\nNon-diagonal Field{ComplexF64}\nleft: ConformalDimension{ComplexF64} with Kac indices r = 1, s = 0\nright: ConformalDimension{ComplexF64} with Kac indices r = 1, s = 0\n\n\njulia> co_chiral = Correlation(V1, V2, V2, V1, :left, 6)\nChiral correlation function with external dimensions\nConformalDimension{ComplexF64} with Kac indices r = 1, s = 0\nConformalDimension{ComplexF64} with Kac indices r = 2, s = 1\nConformalDimension{ComplexF64} with Kac indices r = 2, s = 1\nConformalDimension{ComplexF64} with Kac indices r = 1, s = 0\n\njulia> d1 = V1.dims[:right]; d2 = V2.dims[:right]; co_chiral2 = Correlation(d1, d2, d2, d1, 8)\nChiral correlation function with external dimensions\nConformalDimension{ComplexF64} with Kac indices r = 1, s = 0\nConformalDimension{ComplexF64} with Kac indices r = 2, s = -1\nConformalDimension{ComplexF64} with Kac indices r = 2, s = -1\nConformalDimension{ComplexF64} with Kac indices r = 1, s = 0\n\n\n\n\n\n\n\n","category":"method"},{"location":"conformal_blocks/#Regularisation-of-blocks","page":"Correlation functions and conformal blocks","title":"Regularisation of blocks","text":"","category":"section"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"The blocks have poles at P=P_(r s) when r s in mathbb N^*. We define regularised block via:","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"mathcal F_P_(r s) undersetP to P_(r s)= fracR_r sP - P_(r s) mathcal F_P_(r -s) + mathcal F^textreg_P_(r s)","category":"page"},{"location":"conformal_blocks/#Logarithmic-blocks","page":"Correlation functions and conformal blocks","title":"Logarithmic blocks","text":"","category":"section"},{"location":"conformal_blocks/#Logarithmic-blocks-on-the-sphere","page":"Correlation functions and conformal blocks","title":"Logarithmic blocks on the sphere","text":"","category":"section"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"The expression of logarithmic four-point blocks on the sphere can be found by assuming the holomorphicity of the 4-point function","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"beginalign\n Z(P) = sum_kinmathbbZ D_P+kbeta^-1 leftmathcalF_P+kbeta^-1right^2 +sum_r=1^infty sum_sinfrac1rmathbbZ D_(rs)(P) mathcalG_(rs) \nendalign","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"The coefficient D_P has a double pole at P_(r-s). The blocks mathcal F_P have a simple pole at P_(rs), and we write","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"beginalign\n  mathcalF_P = fracR_rsP-P_(rs) mathcalF_P_(r-s)\n   + mathcalF^textreg_P_(rs)\nendalign","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"Explicitly, using Zamolodchikov's recursion, mathcal F^textreg is written as","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"beginalign\n  mathcalF^textreg_P_(rs) = (textprefactor) H^textreg_P_(rs)\nendalign","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"where the prefactor is the prefactor in Zamolodchikov's recursion, and","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"beginalign\n  H^textreg_P_(rs) = 1 + sum_mn left( frac1P^2_(rs) - P^2_(mn) right)^textreg (16q)^mn R_mn H_P_(m-n)\nendalign","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"and","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"beginalign\nleft(  frac(16q)^P^2P^2_(rs) - P^2_(mn) right)^textreg =\n(16q)^P^2 times\nbegincases\nlog 16q - frac14P_(rs)^2 text  if   (mn)=(rs) \nfrac1P^2_(rs) - P^2_(mn) text  otherwise\nendcases\nendalign","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"Analysing the poles of this expression (there are double poles and simple ones), one arrives at the following expression for the logarithmic blocks: for (r s) in mathbbN^*,","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"beginalign\nmathcalG_(rs) = (mathcalF_P_(rs)^textreg - R_rs mathcalF^_P_(r-s)) barmathcalF_P_(r-s) + fracR_rsbar R_rs mathcalF_P_(r-s) (barmathcalF_P_(rs)^textreg - barR_rs barmathcalF^_P_(r-s))nonumber \n +R_rs underbraceleft( fracD^_P_(rs)D_P_(rs) - lim_P to P_(r-s) left frac2P-P_(r-s) + fracD_P^D_P right right)_-ell^(1)-_(rs)leftmathcalF_P_(r-s)right^2\nendalign","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"in which the primes denote derivatives with respect to the momentum P (see arXiv:1503.02067).","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"The derivative of the block is","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"beginalign\n  mathcalF_P_(r-s)^ = (textprefactor) H^textder_P_(r-s) quad textwhere quad H^textder_P = 2Plog(16q) H_P + H_P^\nendalign","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"The term ell^(1)-_(rs) can be computed as the order 1 term in the Taylor expansion of","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"beginalign\n  log left( epsilon^2 fracD_P_(r-s)+epsilonD_P_(rs)+epsilon right) = sum_ngeq 0 ell^(n)-_(rs) epsilon^n\nendalign","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"Explicitly,","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"beginalign\n betaell^(1)-_(rs) = 4sum_j=1-s^s Big psi(-2beta^-1P_(rj)) +psi(2beta^-1P_( r-j)) Big\n -4pi cot(pi s beta^-2) nonumber\n \n -sum_joverset2=1-s^s-1sum_pmpmBig\n psileft(tfrac12-beta^-1(P_( rj)pm P_1pm P_2)right)\n + psileft(tfrac12+beta^-1(P_( rj)pm bar P_1pm bar P_2)right)\n Big nonumber\n \n -sum_joverset2=1-s^s-1sum_pmpmBig\n psileft(tfrac12-beta^-1(P_( rj)pm P_3pm P_4)right)\n + psileft(tfrac12+beta^-1(P_( rj)pm bar P_3pm bar P_4)right)\n Big\nendalign","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"For (r s) in mathbbN^*, mathcal G_(rs) can actually be non-logarithmic, due to residues R_(rs) and bar R_(rs) vanishing.","category":"page"},{"location":"conformal_blocks/#Logarithmic-blocks-on-the-torus","page":"Correlation functions and conformal blocks","title":"Logarithmic blocks on the torus","text":"","category":"section"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"The argument we used for computing logarithmic blocks on the sphere can be transferred verbatim to the case of one point blocks on the torus. In particular, the expression of the logarithmic block as a residue is also valid for the torus one-point block, if we replace D_P by the corresponding structure constant on the torus, namely","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"beginalign\n  D_P to fracC^textref_PP P_1B_P\nendalign","category":"page"},{"location":"conformal_blocks/","page":"Correlation functions and conformal blocks","title":"Correlation functions and conformal blocks","text":"where P_1 is the momentum of the external field.","category":"page"},{"location":"#BootstrapVirasoro.jl-documentation","page":"Home","title":"BootstrapVirasoro.jl documentation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = BootstrapVirasoro\nDocTestSetup = quote\n    using BootstrapVirasoro\nend","category":"page"},{"location":"","page":"Home","title":"Home","text":"This is the documentation page for the BootstrapVirasoro package. BootstrapVirasoro is a package for doing bootstrap computations in theories with Virasoro symmetry.","category":"page"},{"location":"#Contents","page":"Home","title":"Contents","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Installation\nBasic types\nConformal blocks\nReference","category":"page"}]
}
