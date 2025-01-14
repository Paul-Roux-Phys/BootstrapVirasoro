```{=org}
#+setupfile: /Users/Paul/.doom.d/setupfiles/org-html-themes/org/theme-readtheorg-local.setup
```
```{=org}
#+setupfile: ~/.doom.d/setupfiles/org-basic-latex-export.org
```
```{=org}
#+property: header_args: :eval never-export
```
```{=org}
#+startup: folded
```
# Overview

This document contains a program for performing conformal bootstrap
computations in 2D loop models.

The program relies on the assumption that the spectrum of the model
contains degenerate fields $V^d_{\langle1,s\rangle}$ (see below).

# Conformal bootstrap in 2D

## Notations, parametrisations

### Central charge

We parametrise the central charge of our theories in terms of variables
$B$, $b$ or $\beta$ related by

$$c = 13 + 6B + 6 B^{-1} \quad , \quad B = b^2 = -\beta^2, \quad B = \frac{c-13 \pm \sqrt{(c-1)(c-25)}}{12}$$

By convention we keep $\beta = ib$.

### Fields

We parametrise the conformal dimensions $(\Delta, \bar\Delta)$ of fields
in terms of variables $P, p, \delta$, related by

$$
\Delta = \frac{c-1}{24} + \delta  \quad , \quad \delta = P^2 = -p^2
$$

The variable $P$ is called the momentum. By convention, we always keep
$P=ip$.Moreover, we introduce the following parametrisation of
dimensions in terms of Kac indices $r, s$:

$$P_{(r,s)}=\frac{1}{2}(\beta r - \beta^{-1}s)$$

where $r,s$ are arbitrary numbers. We say the field is degenerate if
$r,s\in \mathbb Z$ and $rs > 0$. This convention is different from the
one in [Sylvain\'s
code](https://gitlab.com/s.g.ribault/Bootstrap_Virasoro.git), but
similar to our more recent conventions, such as in [Sylvain\'s review on
solvable CFTs](https://github.com/ribault/CFT-Review).

In loop models, we denote $V_{(r,s)}$ a non-diagonal field of left and
right momenta $(P_{(r,s)},P_{(r,-s)})$.

## Special functions

Expressions of correlation functions in CFT involve special functions.
In this paragraph we introduce some representations and regularisations
of special functions.

### Digamma function

The digamma function is defined for as

$$\begin{align}
  \psi(z) = \frac{\Gamma'(z)}{\Gamma(z)}
\end{align}$$

The function $\psi$ has poles at negative integers. We regularise the
digamma function thanks to the equation

$$\begin{align}
  \psi(1-x) - \psi(x) = \pi \operatorname{cot}(\pi x)
\end{align}$$

which means we use the regularization

$$\begin{align}
  \psi(-r) \underset{r\in\mathbb{N}}{=} \psi(r+1)
\end{align}$$

### Barne\'s G-function and the double Gamma function

We need to compute the double Gamma function defined by the relations

$$\begin{align}
 \Gamma_{\beta}= \Gamma_{\beta^{-1}}, \quad, \Gamma_{\beta}\left( \frac{\beta + \beta^{-1}}{2} \right) = 1, \quad \Gamma_{\beta}(w + \beta) = \sqrt{2\pi} \frac{\beta^{\beta w-\frac{1}{2}}}{\Gamma(\beta w)} \Gamma_{\beta}(w)
\end{align}$$

(see [wikipedia
article](https://en.wikipedia.org/wiki/Multiple_gamma_function)).

It also obeys

$$\begin{align}
  \Gamma_{\beta}(w+\beta^{-1}) = \sqrt{2\pi} \frac{\beta^{-\beta^{-1}w+\frac12}}{\Gamma(\beta^{-1}w)} \Gamma_{\beta}(w).
\end{align}$$

For computing $\Gamma_\beta$ it is convenient to use its relation to the
Barne\'s $G$ -function (see [wikipedia
article](https://en.wikipedia.org/wiki/Barnes_G-function)), which is
related to $\Gamma_\beta$ as

$$\begin{align}
\Gamma_\beta(w) = \frac{\Gamma_2(w|\beta,\beta^{-1})}{\Gamma_2\left(\frac{\beta+\beta^{-1}}{2}\middle|\beta,\beta^{-1}\right)} \quad , \quad
 \Gamma_2(w|\beta,\beta^{-1})=(2\pi)^{\frac{w}{2\beta}} \beta^{\frac{w}{2}(w-\beta-\beta^{-1})+1} G(\beta^{-1}w,\beta^{-2})^{-1}
\end{align}$$

According to the theorem 1 in
[arXiv:2208.13876](https://arxiv.org/abs/2208.13876), the $G$ function
has the following product representation

$$\begin{align}
  G(z, \tau) = G_{N}(z, \tau) \exp\left(z^{3} R_{M,N}(z,\tau) + O(N^{-M-1})\right)
\end{align}$$

where $G_N$ is defined in terms of Gamma and polygamma functions,

$$\begin{align}
 G_N(z,\tau) = \frac{1}{\tau\Gamma(z)} e^{a(\tau) \frac{z}{\tau}+b(\tau)\frac{z^2}{2\tau^2}}
 \prod_{m=1}^N \frac{\Gamma(m\tau)}{\Gamma(z+m\tau)}e^{z\psi(m\tau)+\frac{z^2}{2}\psi'(m\tau)}
\end{align}$$

while $R_{M, N}$ is a linear combination of certain polynomials $P_k$,

$$\begin{align}
R_{M, N}(z,\tau) = \sum_{k=1}^M (k-1)!(-\tau)^{-k-1}P_k(z, -\tau) N^{-k}
\end{align}$$

where the polynomials are defined recursively by $P_1(z,\tau)=\frac16$,
and

$$\begin{align}
P_n(z,\tau) = \frac{z^{n-1}}{(n+2)!}-\frac{1}{\tau}\sum_{k=1}^{n-1} \frac{(1+\tau)^{k+2}-1-\tau^{k+2}}{(k+2)!} P_{n-k}(z,\tau)
\end{align}$$

It remains to define the coefficients

$$\begin{align}
a(\tau) = \tfrac12\tau\log(2\pi\tau) +\tfrac12\log(\tau) -\tau C(\tau) \quad , \quad b(\tau) =-\tau\log(\tau) -\tau^2D(\tau)
\end{align}$$

where the modular forms $C(\tau),D(\tau)$ are

$$\begin{align}
C(\tau) &= \frac{1}{2\tau}\log(2\pi) -\int_0^\infty dx\left[ \frac{e^{(1-\tau)x}}{2\sinh(x)\sinh(\tau x)}- \frac{e^{-2x}}{\tau x}\left(\frac{e^{x}}{2\sinh(x)}+1-\frac{\tau}{2}\right)\right]
\\
D(\tau) &= \int_0^\infty dx\left[ \frac{x e^{(1-\tau)x}}{\sinh(x)\sinh(\tau x)} - \frac{e^{-2x}}{\tau x}\right]
\end{align}$$

(We rewrite denominators in terms of $\sinh$ in order to minimize
numerical errors.)

For numerical evaluation of these integrals, it is useful to know the
expansion of their integrands as $x\to 0$:

$$\begin{align}
C(x, \tau) = \frac{2}{\tau} - \frac32 + \frac{\tau}{6} + \left(\frac56 - \frac{2}{\tau} + \frac{\tau}{6}\right)x  + \left( \frac4{3\tau} - \frac23 + \frac1{18}\tau - \frac{1}{90}\tau^{3}\right) x^{2}\quad , \quad D_0 = \frac{3}{\tau}-1
\end{align}$$

The error is of order $\left(\frac{eN}{M}\right)^{-M}$, and the
computation time of order $N+ M^2$. To minimize computation time while
keeping the error of order $10^{-d}$, we take values of the type

$$\begin{align}
N = 20M, \quad M = \frac{\log(10)}{\alpha\log(20)}d
\end{align}$$

where $\alpha$ is a parameter for reducing $M$, which otherwise is too
high in practice. Up to logarithmic factors, the computation time is of
order $d^2$, whereas it should be of order $d$ for the integral formula.

## Four point functions on the sphere

### Chiral and non chiral blocks

Because of conformal invariance, computation of any four-point
correlation function on the sphere reduces to the computation of

$$ \mathcal G(x) = \langle V_{1}(x) V_{2}(0) V_{3}(\infty) V_{4}(1) \rangle $$

Four-point correlation functions can be written in terms of Virasoro
blocks as

$$\begin{align}
  \mathcal G(x) = \sum_{k \in \mathcal S} \frac{C_{12k} C_{k34}}{B_{k}} \mathcal G_{\Delta_k}^{(s)}(c |\Delta_{1}, \dots, \Delta_{4}|z)\end{align}$$

We call
$\mathcal G_{\Delta_k}^{(s)}(c |\Delta_{1}, \dots, \Delta_{4}|z)$ a
non-chiral conformal block. In the case of a non-logarithmic theory,
conformal blocks factorise as

$$\begin{align}
  \mathcal G_{\Delta_k}^{(s)}(c |\Delta_{1}, \dots, \Delta_{4}|z) = \left| \mathcal F^{(s)}_{\Delta_{k}}(c | \Delta_{1}, \dots, \Delta_{4} | z) \right|^{2}
\end{align}$$

where we have introduced the notation
$\left|\mathcal F(\Delta, z)\right|^2 = \mathcal{F}(\Delta, z) \mathcal{F}(\bar\Delta, \bar z)$,
and $\mathcal F^{(s)}_{\Delta_k}$ is called a Virasoro block (also
called chiral conformal block).

The coefficients $C_{ijk}$ are the three-point structure constants.

Conformal blocks are characterized by the normalization conditions

$$\begin{align}
 \mathcal{G}^{(s)}_\Delta(x) & \underset{x\to 0}{=} \left| x^{\Delta-\Delta_1-\Delta_2}\right|^2 \left(1+O(x)\right)
 \\
 \mathcal{G}^{(t)}_\Delta(x) & \underset{x\to 1}{=} \left|(1-x)^{\Delta-\Delta_1-\Delta_4}\right|^2 \left(1+O(1-x)\right)
 \\
 \mathcal{G}^{(u)}_\Delta(x) & \underset{x\to \infty}{=} \left|\left(\frac{1}{x}\right)^{\Delta+\Delta_1-\Delta_3} \right|^2\left(1+O\left(\frac{1}{x}\right)\right)
\end{align}$$

Together with the invariance of
$\left\langle \prod_{i=1}^4 V_{\Delta_i}(z_i) \right\rangle$ under
permutations, this leads to the relations

$$\begin{align}
\mathcal{G}^{(t)}_{\Delta}(\Delta_1,\Delta_2,\Delta_3,\Delta_4|x)
&= (-1)^{S_1+S_2+S_3+S_4}
\mathcal{G}^{(s)}_{\Delta}(\Delta_1,\Delta_4,\Delta_3,\Delta_2|1-x)
\\
\mathcal{G}^{(u)}_\Delta(\Delta_1,\Delta_2,\Delta_3,\Delta_4|x)
&= (-1)^{S_1+S_2+S_3+S_4}
\left|x^{-2\Delta_1}\right|^2 \mathcal{G}^{(s)}_\Delta(\Delta_1,\Delta_3,\Delta_2,\Delta_4|\tfrac{1}{x})
\end{align}$$

where $S=\Delta-\bar\Delta$ is the conformal spin, which we assume to be
integer.

### Zamolodchikov\'s recursion for four-point blocks

Four-point blocks can be computed efficiently thanks to
[Zamolodchikov\'s
recursion](https://en.wikipedia.org/wiki/Virasoro_conformal_block).

We introduce a variable $q$ related to $x$ through

$$
x = \frac{\theta_2(q)^4}{\theta_3(q)^4}, \quad q = e^{-\pi\frac{K(1-x)}{ K(x)}}
$$

where

$$
\theta_3(q) = \sum_{n\in\mathbb{Z}} q^{n^2} \quad , \quad \theta_2(q) = 2q^\frac14\sum_{n=0}^\infty q^{n(n+1)}
$$

are Jacobi special $\theta$-functions, and $K(x)$ is the elliptic $K$
function.

In terms of these variables, our chiral $s$-channel conformal block is

$$\begin{align}
\mathcal{F}^{(s)}_{\delta}(c | \Delta_{1}, \dots, \Delta_{4} | x) =  x^{E_0} (1-x)^{E_1} \theta_3(q)^{-4E_2}
(16q)^{\delta} H_{\delta}(c | \Delta_{1},\dots, \Delta_{4} | q)
\end{align}$$

where we use the exponents

$$
E_0 = -\delta_1-\delta_2-\frac{c-1}{24} \quad , \quad E_1 = -\delta_1-\delta_4-\frac{c-1}{24} \quad ,
\quad E_2 = \delta_1+\delta_2+\delta_3+\delta_4+\frac{c-1}{24}
$$

The non-trivial coefficient is the series

$$
H_{\delta}(q) = 1 + \sum_{N=1}^{N_{max}} \sum_{mn\leq N} C_{m,n}^N \frac{(16q)^N}{\delta-\delta_{(m,n)}}
$$

Where the coefficient $C_{m,n}^N$ is defined by the recursive formula

$$
C^N_{m,n} = R_{m,n}\left(\delta_{N-mn,0} + \sum_{m'n'\leq N-mn} \frac{C^{N-mn}_{m',n'}}{\delta_{(m,-n)}-\delta_{(m',n')}} \right)
$$

And the coefficients $R_{m,n}$ can be written

$$\begin{align}
 R_{m,n} = \frac{1}{2}\frac{1}{D_{mn}}
\prod_{r\overset{2}{=} 1-m}^{m-1}
\prod_{s\overset{2}{=}1-n}^{n-1}
&\sqrt{(\delta_2-\delta_1)^2 -2\delta_{(r,s)}(\delta_1+\delta_2) + \delta_{(r,s)}^2}\nonumber\\
&\sqrt{(\delta_3-\delta_4)^2 -2\delta_{(r,s)}(\delta_3+\delta_4) + \delta_{(r,s)}^2}
\end{align}$$

We do not actually take square roots, because each factor appears twice,
except the $(r,s)=(0,0)$ factor which is however a perfect square. The
normalization factor is

$$\begin{equation}
D_{m,n} = mn \prod_{r=1}^{m-1} r^2B \left(r^2B - \frac{n^2}{B}\right)
\prod_{s=1}^{n-1} \frac{s^2}{B}\left(\frac{s^2}{B} - m^2B\right)
\prod_{r=1}^{m-1} \prod_{s=1}^{n-1} \left(r^2B -\frac{s^2}{B} \right)^2.
\end{equation}$$

## One point functions on the torus

### Chiral and non-chiral blocks

A one-point function on the torus can be written

$$\begin{align}
 \mathcal G(x) = <V_{\Delta_1}(x)> = \operatorname{Tr} (q^{L_0-\frac{c}{24}} \bar q^{\bar L_{0}-\frac{c}{24}} V_{\Delta_{1}}(x))
\end{align}$$

Because of translation invariance, one-point functions on the torus do
not depend on the field\'s position. The trace can be written as

$$\begin{align}
  \mathcal G(x) &= \sum_{V_{\Delta} \in \mathcal S} < V_{\sigma} | V_{\Delta_{1}}(x) |V_{\sigma}> \\
                   &= \sum_{V_{\Delta} \in \mathcal S} \frac{C_{\Delta \Delta \Delta_{1}}}{B_{\Delta}} \mathcal G_{\Delta} (\tau, c, \Delta_{1} | x)
\end{align}$$

The conformal block $\mathcal G_\Delta(\tau, c, \Delta_1|x)$ factorises
for non-logarithmic theories, and we write
$\mathcal F_\Delta(\tau, c, \Delta_1 | x)$ the corresponding Virasoro
chiral block.

### Zamolodchikov\'s recursion for torus one-point blocks

Like four-point blocks, torus one-point blocks can be computed
recursively. We introduce $H$ defined by

$$\begin{align}
  \mathcal F_{\Delta}(\tau, c, \Delta_{1} | x) = \frac{q^{\delta}}{\eta(q)} H^{\text{torus}}_{\Delta}(\tau, c, \Delta_{1} | q),
\end{align}$$

where $q=e^{2i\pi \tau}$. The recursion formula for
$H^{\text{torus}}_{\Delta}(\tau, c, \Delta_{1} | q)$ is

$$\begin{align}
  H_{\Delta}^{\text{torus}} (\tau, c, \Delta_{1} | q) = 1 + \sum_{N=1}^{N_{\text{max}}}\sum C^{N, \text{torus}}_{m,n} \frac{q^N}{\delta - \delta_{(m,n)}}
\end{align}$$

The coefficients $C_{m,n}^{N,\text{torus}}$ have the recursive
representation

$$\begin{equation}
C^{N,\text{torus}}_{m,n} = R^{\text{torus}}_{m,n}\left(\delta_{N-mn,0} + \sum_{m'n'\leq N-mn} \frac{C^{N-mn}_{m',n'}}{\delta_{(m,-n)}-\delta_{(m',n')}} \right)
\end{equation}$$

An expression for the $R_{m,n}^{\text{torus}}$ can be found on [this
wikipedia
article](https://en.wikipedia.org/wiki/Virasoro_conformal_block). It can
be rewritten

$$
R_{m,n}^{\text{torus}} = \frac{1}{2 D_{m,n}} \prod_{r\overset2=1-2m}^{2m-1} \prod_{s\overset2=1-2n}^{2n-1} \sqrt{\delta_{(r,s)} - \delta_1}
$$

where we do not actually take square roots, because each factor appears
twice. The normalization factor is the same $D_{m,n}$ as in the
four-point case.

## Logarithmic blocks

See [this paper](https://arxiv.org/abs/2007.04190) for more detail
([here](~/Downloads/log_CFT_ribault_nivesvivat.pdf) on my laptop).

### Logarithmic modules

In loop models the action of $L_0$ is not diagonalisable, said otherwise
some of the modules are logarithmic. The structure of a logarithmic
module $\mathcal W^\kappa_{(r,s)}$ is the following:

![](./imgs/logarithmic_module.png)

$\mathcal L V_{(r,s)}$ and $\bar{\mathcal L} V_{(r,s)}$ are non-diagonal
primary fields. The parameter $\kappa$ is fixed in the presence of
$V^d_{\langle1,2\rangle}$, in which case the logarithmic module is
generated by

$$\begin{align}
  W^{-}_{(r,s)} = \partial_{P} V_{P_{(r,-s)}} - \mathcal{L}_{(r,s)} \bar{\mathcal{L}}_{(r,s)} \partial_{P} V_{P_{(r,s)}}
\end{align}$$

This is the necessary condition for the OPE

$$\begin{align}
  V^{d}_{\langle 1,s_{0}\rangle} V_{P_{(r,0)}+\epsilon}
\end{align}$$

to be finite.

### Logarithmic blocks on the sphere

The expression of logarithmic four-point blocks on the sphere can be
found by assuming the holomorphicity of the 4-point function

$$\begin{align}
 Z(P) = \sum_{k\in\mathbb{Z}} D_{P+k\beta^{-1}} \left|\mathcal{F}_{P+k\beta^{-1}}\right|^2 +\sum_{r=1}^\infty \sum_{s\in\frac{1}{r}\mathbb{Z}} D_{(r,s)}(P) \mathcal{G}_{(r,s)}\ .
\end{align}$$

(argument made by Sylvain in the
[solvable.pdf](~/Documents/Cours suivis/Sylvain CFT review/CFT-Review/solvable.pdf)
file on [GitHub](https://github.com/ribault/CFT-Review)).

The coefficient $D_P$ has a double pole at $P_{(r,-s)}$. The blocks
$\mathcal F_{P}$ have a simple pole at $P_{(r,s)}$, and we write

$$\begin{align}
  \mathcal{F}_{P} = \frac{R_{r,s}}{P-P_{(r,s)}} \mathcal{F}_{P_{(r,-s)}} + \mathcal{F}^{\text{reg}}_{P_{(r,s)}} + O(P-P_{(r,s)}).
\end{align}$$

Explicitly, using Zamolodchikov\'s recursion, $\mathcal F^{\text{reg}}$
is written as

$$\begin{align}
  \mathcal{F}^{\text{reg}}_{P_{(r,s)}} = (\text{prefactor}) H^{\text{reg}}_{P_{(r,s)}},
\end{align}$$

where the prefactor is the prefactor in Zamolodchikov\'s recursion, and

$$\begin{align}
  H^{\text{reg}}_{P_{(r,s)}} = 1 + \sum_{m,n} \left( \frac{1}{P^{2}_{(r,s)} - P^{2}_{(m,n)}} \right)^{\text{reg}} (16q)^{mn} R_{m,n} H_{P_{(m,-n)}}
\end{align}$$

and

$$\begin{align}
\left(  \frac{(16q)^{P^{2}}}{P^{2}_{(r,s)} - P^{2}_{(m,n)}} \right)^{\text{reg}} =
(16q)^{P^{2}} \times
\begin{cases}
\log 16q - \frac{1}{4P_{(r,s)}^{2}} \text{  if  } (m,n)=(r,s) \\
\frac{1}{P^{2}_{(r,s)} - P^{2}_{(m,n)}}  \text{  otherwise}
\end{cases}.
\end{align}$$

Analysing the poles of this expression (there are double poles and
simple ones), one arrives at the following expression for the
logarithmic blocks: for $(r, s) \in \mathbb{N}^{*}$,

$$\begin{align}
\mathcal{G}_{(r,s)} = (\mathcal{F}_{P_{(r,s)}}^{\text{reg}} - R_{r,s}& \mathcal{F}^{'}_{P_{(r,-s)}}) \bar{\mathcal{F}}_{P_{(r,-s)}} + \frac{R_{r,s}}{\bar R_{r,s}} \mathcal{F}_{P_{(r,-s)}} (\bar{\mathcal{F}}_{P_{(r,s)}}^{\text{reg}} - \bar{R}_{r,s} \bar{\mathcal{F}}^{'}_{P_{(r,-s)}})\nonumber \\
& +R_{r,s} \underbrace{\left( \frac{D^{'}_{P_{(r,s)}}}{D_{P_{(r,s)}}} - \lim_{P \to P_{(r,-s)}} \left[ \frac{2}{P-P_{(r,-s)}} + \frac{D_{P}^{'}}{D_{P}} \right] \right)}_{-\ell^{(1)-}_{(r,s)}}\left|\mathcal{F}_{P_{(r,-s)}}\right|^{2},
\end{align}$$

see Liouville theory at central charge less than 1 ref \[13\].

in which the primes denote derivatives with respect to the momentum $P$.
The derivative of the block is

$$\begin{align}
  \mathcal{F}_{P_{(r,-s)}}^{'} = (\text{prefactor}) H^{\text{der}}_{P_{(r,-s)}}, \quad \text{where} \quad H^{\text{der}}_{P} = 2P\log(16q) H_{P} + H_{P}^{'}.
\end{align}$$

The term $\ell^{(1)-}_{(r,s)}$ can be computed as the order 1 term in
the Taylor expansion of

$$\begin{align}
  \log \left( \epsilon^{2} \frac{D_{P_{(r,-s)}+\epsilon}}{D_{P_{(r,s)+\epsilon}}} \right) = \sum_{n\geq 0} \ell^{(n)-}_{(r,s)} \epsilon^{n}.
\end{align}$$

Explicitly,

$$\begin{align}
 \beta\ell^{(1)-}_{(r,s)} = 4\sum_{j=1-s}^s &\Big\{ \psi(-2\beta^{-1}P_{(r,j)}) +\psi(2\beta^{-1}P_{( r,-j)}) \Big\}
 -4\pi \cot(\pi s \beta^{-2})
 \\
 &-\sum_{j\overset{2}{=}1-s}^{s-1}\sum_{\pm,\pm}\Big\{
 \psi\left(\tfrac12-\beta^{-1}(P_{( r,j)}\pm P_1\pm P_2)\right)
 + \psi\left(\tfrac12+\beta^{-1}(P_{( r,j)}\pm \bar P_1\pm \bar P_2)\right)
 \Big\}
 \\
 &-\sum_{j\overset{2}{=}1-s}^{s-1}\sum_{\pm,\pm}\Big\{
 \psi\left(\tfrac12-\beta^{-1}(P_{( r,j)}\pm P_3\pm P_4)\right)
 + \psi\left(\tfrac12+\beta^{-1}(P_{( r,j)}\pm \bar P_3\pm \bar P_4)\right)
 \Big\}
\end{align}$$

For $(r, s) \in \mathbb{N}^{*}$, $\mathcal G_{(r,s)}$ can actually be
non-logarithmic, due to residues $R_{(r,s)}$ and $\bar R_{(r,s)}$
vanishing.

### Logarithmic blocks on the torus

The argument we used for computing logarithmic blocks on the sphere can
be transferred verbatim to the case of one point blocks on the torus. In
particular, the [expression](ref:eq:log_block) of the logarithmic block
is also valid for the torus one-point block, if we replace $D_P$ by the
corresponding structure constant on the torus, namely

$$\begin{align}
  D_{P} \to \frac{C^{\text{ref}}_{P,P, P_1}}{B_{P}}
\end{align}$$

where $P_1$ is the momentum of the external field.

## Relation between sphere four-point blocks and torus one-point blocks

The recursion formulas for torus one-point blocks and sphere four-point
blocks imply that four point blocks on the sphere are related to
one-point blocks on the torus through the relation

$$\begin{align}
H^{\text{torus}}_{P}(\tau, c | P_{1} | q^{2}) = H_{\sqrt{2}P}\left(c' \left|\left. P_{(0,\frac12)}, \frac{P_{1}}{\sqrt{2}}, P_{(0,\frac12)}, P_{(0,\frac12)} \right.\right| q \right)
\end{align}$$

where

-   $c'$ is related to $c$ via $\beta'=\frac\beta{\sqrt 2}$.
-   Fields on the RHS have dimensions $\Delta = \frac{c'-1}{24} - P^2$.

Our code successfully reproduces this relation:

``` julia
import Pkg; Pkg.activate(".")
using BootstrapVirasoro, BenchmarkTools, EllipticFunctions
import BootstrapVirasoro.FourPointBlocksSphere.qfromx
q = BootstrapVirasoro.FourPointBlocksSphere.qfromx(0.05)

left=1;
right=2;
c_torus = CentralCharge(:b, 1.2+.1*1im);
c_sphere = CentralCharge(:b, (1.2+.1*1im)/sqrt(2))

P = 0.23+.11im
P1 = 0.41+1.03im
V_torus_chan = Field(c_torus, :P, P, diagonal=true)
δ_torus = V_torus_chan.δ[left]
δ11_torus = Field(c_torus, Kac=true, r=1, s=1, diagonal=true).δ[left]
V_torus_ext = Field(c_torus, :P, P1, diagonal=true)
corr_torus = OnePointCorrelation

V_sphere_chan = Field(c_sphere, :P, sqrt(2)*P, diagonal=true)
δ_sphere = V_sphere_chan.δ[left]
δ21_sphere = Field(c_sphere, Kac=true, r=2, s=1, diagonal=true).δ[left]
δ12_sphere = Field(c_sphere, Kac=true, r=1, s=2, diagonal=true).δ[left]
V_sphere_ext = Field(c_sphere, :P, P1/sqrt(2), diagonal=true)
VKac_sphere = Field(c_sphere, Kac=true, r=0, s=1//2, diagonal=true)

corr_torus = OnePointCorrelation(c_torus, V_torus_ext)
block_torus = OnePointBlockTorus(V_torus_chan)

corr_sphere = FourPointCorrelation(c_sphere, [VKac_sphere, V_sphere_ext, VKac_sphere,VKac_sphere])
block_sphere = FourPointBlockSphere(:s, V_sphere_chan)

h1 = BootstrapVirasoro.OnePointBlocksTorus.H(q^2, 5, block_torus, corr_torus, left)
h2 = BootstrapVirasoro.FourPointBlocksSphere.H(q, 5, block_sphere, corr_sphere, left)
```

``` julia
println("torus block = $h1")
println("sphere block = $h2")
```

## Crossing symmetry for four-point functions on the sphere

## Modular invariance for one-point functions on the torus

# Code of the package [[noeval]{.smallcaps}]{.tag tag-name="noeval"} {#code-of-the-package}

## Main module {#main-module header-args:julia=":tangle ./src/BootstrapVirasoro.jl"}

The module `BootstrapVirasoro` is the main module of this package, and
it includes the sub-modules.

-   `CFTData` provides types for central charges and fields.
-   `CorrelationFunctions` provides types for one-point and four-point
    correlation functions, as well as methods for computing coefficients
    appearing in their conformal blocks.
-   `VirasoroConformalBlocks` provides types for representing four-point
    conformal blocks on the sphere and one-point conformal blocks on the
    torus, as well as methods for computing them.

``` julia
#===========================================================================================

Written by Paul Roux, adapting a Python code written by Sylvain Ribault & Rongvoram
Nivesvivat

===========================================================================================#

module BootstrapVirasoro

using Latexify # print outputs in latex format

#===========================================================================================
Special functions
===========================================================================================#
include("SpecialFunctions.jl")
using .SpecialFunctions
export Barnes_G
export logdoublegamma, doublegamma

#===========================================================================================
Central charges and fields
===========================================================================================#
include("CFTData.jl")
using .CFTData
export CentralCharge
export ConformalDimension
export Field, spin

#===========================================================================================
Correlation functions
===========================================================================================#

abstract type CorrelationFunction end

include("CorrelationFunctions.jl")
using .FourPointCorrelationFunctions
export FourPointCorrelation

using .OnePointCorrelationFunctions
export OnePointCorrelation

#===========================================================================================
Conformal blocks
===========================================================================================#

abstract type ConformalBlock end

include("ConformalBlocks.jl")
using .FourPointBlocksSphere
export FourPointBlockSphere
export block_chiral, block_non_chiral

using .OnePointBlocksTorus
export OnePointBlockTorus

end
```

## The `SpecialFunctions` module {#the-specialfunctions-module header-args:julia=":tangle ./src/SpecialFunctions.jl"}

### Header

``` julia
#==================

SpecialFunctions.jl computes the special functions relevant for our applications in 2D CFT.

==================#

module SpecialFunctions

import SpecialFunctions as SF
using Memoization
using ArbNumerics # the SpecialFunctions package has no arbitrary-precision complex-variable gamma function, however the ArbNumerics does. We use this, and convert to a Complex{BigFloat}
import Base: precision

export loggamma,
    gamma,
    digamma_reg,
    Barnes_G,
    logdoublegamma,
    doublegamma

"""
    cotpi(x) = cot(π * x)
"""
cotpi(x) = SF._cotpi(x)

for f in (:gamma, :digamma)
    @eval $f(z::Union{Real, Complex{Float64}}) = SF.$f(z)
    @eval $f(z::Complex{BigFloat}) = Complex{BigFloat}(ArbNumerics.$f(ArbComplex(z, bits=precision(BigFloat))))
end

trigamma(z::Union{Float64, Complex{Float64}}) = SF.trigamma(z)
trigamma(z::BigFloat) = BigFloat(ArbNumerics.polygamma(ArbComplex(1, bits=precision(BigFloat)), ArbComplex(z, bits=precision(BigFloat))))
trigamma(z::Complex{BigFloat}) = Complex{BigFloat}(ArbNumerics.polygamma(ArbComplex(1, bits=precision(BigFloat)), ArbComplex(z, bits=precision(BigFloat))))

loggamma(z::Union{Real, Complex{Float64}}) = SF.loggamma(z)
loggamma(z::Complex{BigFloat}) = Complex{BigFloat}(ArbNumerics.lgamma(ArbComplex(z, bits=precision(BigFloat))))

polygamma(n, z::Union{Real, Complex{Float64}}) = SF.polygamma(n, z)
polygamma(n, z::Complex{BigFloat}) = Complex{BigFloat}(polygamma(ArbComplex(n), ArbComplex(z, bits=precision(BigFloat))))

function precision(z::Complex)
    return precision(real(z))
end

"""Convert to a standard precision number"""
function convert_precision(x::Number, precision)
    if precision <= 53 # precision of Float64
        if isreal(x)
            return Float64(Real(x))
        else
            return Complex{Float64}(x)
        end
    else # precision > 53
        if isreal(x)
            return BigFloat(Real(x), precision=precision)
        else
            r = BigFloat(real(x), precision=precision)
            i = BigFloat(imag(x), precision=precision)
            return Complex{BigFloat}(r, i)
        end
    end
end

"""Change the precision of x to precision"""
macro convert_precision!(var, precision)
    quote
        $var = convert_precision($var, $precision)
    end |> esc
end
```

### Regularized digamma Function

``` julia
"""Regularised digamma function"""
function digamma_reg(z)
    if real(z) > 0
        return digamma(z)
    elseif isreal(z) && real(z) < 0 && real(z)%1 == 0
        return digamma(1-z)
    else
        return digamma(1-z) - oftype(z, π)*cotpi(z)
    end
end
```

### Double gamma function

The function `log_Barnes_GN` is the logarithm of the function
[G~N~](eqref:eq:Barnes_{GN}).

``` julia
function integrandC(x, τ)
    x = big(x)
    return exp((1-τ)*x)/(2*sinh(x)*sinh(τ*x)) - exp(-2*x)/(τ*x)*(exp(x)/(2*sinh(x))+1-τ/2)
end

function modularC(τ)
    P = precision(BigFloat) ÷ 2
    #temporarily increase precision to avoid artificial divergence around zero
    setprecision(BigFloat, Int(floor(1.3*P)))
    cutoff = big(2^(-P/5)) # to prevent artificial divergence around zero
    tol = big(2)^P

    #compute integral
    value, error = quadgk(x -> integrandC(x, τ), cutoff, big(Inf), rtol = tol, order=21)
    C0 = (2/τ - 3//2 + τ/6)*cutoff + (5//12 - 1/τ + τ/12)*cutoff^2 + (4/(9*τ) - 2//9 + 1//54*τ - 1//270*τ^3)*cutoff^3
    setprecision(BigFloat, 2P)

    return 1/(2*τ)*log(2*oftype(τ, π)) - value - C0
end

function integrandD(x, τ)
    x = big(x)
    return x*exp((1-τ)*x)/(sinh(x)*sinh(τ*x)) - exp(-2*x)/(τ*x)
end

function modularD(τ)
    P = precision(BigFloat, base=10)
    #temporarily increase precision to avoid artificial divergence around zero
    setprecision(BigFloat, base=10, Int(floor(1.3*P)))
    cutoff = big(10^(-P/5)) # to prevent artificial divergence around zero
    tol = big(10)^P
    value, error = quadgk( x -> integrandD(x, τ), big(0), big(Inf), rtol = tol, order=21)
    setprecision(BigFloat, base=10, P)
    return value
end

@memoize function modularcoeff_a(τ)
    return convert_precision(1/2*τ*log(2*oftype(τ, π)*τ) + 1/2*log(τ) - τ*modularC(τ), precision(τ))
end

@memoize function modularcoeff_b(τ)
    return convert_precision(-τ*log(τ) - τ^2*modularD(τ), precision(τ))
end

function log_Barnes_GN(N, z, τ)
    # keep only the minimum precision
    prec = min(precision(z), precision(τ))
    @convert_precision!(z, prec)
    @convert_precision!(τ, prec)

    #compute the sum
    res = 0
    res += - log(τ) - loggamma(z)
    res += convert_precision(modularcoeff_a(τ)*z/τ + modularcoeff_b(τ)*z^2/(2*τ^2), prec)
    res += sum(loggamma(m*τ) - loggamma(z+m*τ) + z*digamma(m*τ)+z^2/2*trigamma(m*τ) for m in 1:N)
    return res
end

@memoize function factorial_big(n)::BigInt
    return factorial(big(n))
end

@memoize function polynomial_Pn(n, z, τ)
    if n == 1
        return 1//6
    else
        term1 = z^(n-1)/factorial_big(n+2)
        summand(k) = ((1+τ)^(k+2) - 1 - τ^(k+2))/(factorial_big(k+2)*τ) * polynomial_Pn(n-k, z, τ)
        return term1 - sum(summand(k) for k in 1:n-1)
    end
end

function rest_RMN(M, N, z, τ)
    # keep only the minimum precision
    prec = min(precision(z), precision(τ))
    @convert_precision!(z, prec)
    @convert_precision!(τ, prec)

    return convert_precision(sum(factorial_big(k-1)*(-τ)^(-k-1)*polynomial_Pn(k, z, -τ)/N^k for k in 1:M), prec)
end

"""Numerical approximation of the logarithm of Barne's G-function, up to a given tolerance"""
function log_Barnes_G(z, τ, tol)
    d = -log(tol)/log(10)
    M = floor(0.8*log(10)/log(20)*d)
    N = 30*M
    return log_Barnes_GN(N, z, τ) + z^3*rest_RMN(M, N, z, τ)
end

function Barnes_G(z, τ, tol)
    return exp(log_Barnes_G(z, τ, tol))
end

function log_Gamma_2(w, β, tol)
    β = real(β-1/β) < 0 ? 1/β : β # change β -> 1/β if needed
    return w/(2*β)*log(2*oftype(β, π)) + (w/2*(w-β-1/β)+1)*log(β) - log_Barnes_G(w/β, 1/β^2, tol)
end

"""
        logdoublegamma(w, β, tol) = Γ_β(w)

Compute the logarithm of the double gamma function Γ_β(w, β) with precision tol
"""
function logdoublegamma(w, β, tol)
    return log_Gamma_2(w, β, tol) - log_Gamma_2((β+1/β)/2, β, tol)
end

"""
        doublegamma(w, β, tol)

Compute the double gamma function Γ_β(w) with precision tol

"""
function doublegamma(w, β, tol)
    exp(logdoublegamma(w, β, tol))
end
```

### End module

``` julia
end # end module
```

## The `CFTData` module {#the-cftdata-module header-args:julia=":tangle ./src/CFTData.jl"}

The file [CFTData.jl](src/CFTData.jl) defines

-   a type `CentralCharge` that represents a central charge $c$.
-   a type `Field` that represents a field $V$. The field can be defined
    from its Kac indices $r, s$, be diagonal, logarithmic, or
    degenerate. The struct contains booleans for these three
    characteristics, as well as rationals for $r$ and $s$, and the pairs
    of (left, right) values $(\Delta, \bar \Delta)$, $(p, \bar p)$,
    $(\delta, \bar \delta)$, $(P, \bar P)$.

### Header

``` julia

#===========================================================================================

CFTData.jl contains a module CFTData that provides types representing
central charges and fields in 2D CFTs with Virasoro symmetry.

Written by Paul Roux, adapting a Python code written by Sylvain Ribault & Rongvoram
Nivesvivat

============================================================================================#

"""
Provides types representing central charges and fields in CFT.
"""
module CFTData

using Latexify;

export CentralCharge
export ConformalDimension
export Field, spin
```

### Central charge

1.  Constructors, parametrisations

    ```` julia
    """
        CentralCharge{T}

    Type representing a central charge.
    T is expected to be a real or complex number, of standard or arbitrary precision
    """
    struct CentralCharge{T <: Union{AbstractFloat, Complex{Float64}, Complex{BigFloat}}}

        β::T

    end

    """Get B from given parameter"""
    function Bfrom(s::Symbol, x)
        a = (x-1)*(x-25)
        @match s begin
            :β => -x^2
            :c => if isreal(a) && a > 0
                     (x-13+sqrt((x-1)*(x-25)))/12
                  else # a is complex
                     (x-13+sqrt(complex((x-1)*(x-25))))/12
                  end
            :b => x^2
            :B => x
        end
    end

    """Get asked parameter from B"""
    function Bto(s::Symbol, x)
        rx = sqrt(complex(x))
        res = @match s begin
            :β => -im*rx
            :c => 13+6*x+6/x
            :b => -rx
            :B => x
        end
        return isreal(res) ? real(res) : res
    end


    function Base.getproperty(c::CentralCharge, s::Symbol)
        β = Bto(:β, Bfrom(:β, getfield(c, :β)))
        β = isreal(β) ? real(β) : β
        if s === :β
            β
        elseif s === :c
            13 - 6*β^2 - 6/β^2
        elseif s === :B
            -β^2
        elseif s === :b
            -im*β
        elseif s === :n
            -2*cos(oftype(β, π)*β^2)
        else
            error("$s is not a supported parametrisation of the central charge")
        end
    end

    """
        CentralCharge(parameter, value)

    Constructor function for the CentralCharge type.

    Given one of the four parameters `c`, `b`, `β`, `B` and its value,
    creates an object CentralCharge{T} where T is real if `β` is real.

    # Example
    ```julia-repl
    julia> setprecision(BigFloat, 20, base=10)
    julia> CentralCharge(big"1.2")
    c = 0.1933333333333333332741, β = 1.200000000000000000003

    ```
    """
    function CentralCharge(s::Symbol, x)
        β = Bto(:β, Bfrom(s, x))
        CentralCharge(β)
    end
    ````

2.  Pretty printing

    ``` julia
    """Display an object of type CentralCharge"""
    function Base.show(io::IO, c::CentralCharge)
        println("c = $(c.c), β = $(c.β)")
    end
    ```

### Conformal dimensions and Fields

Fields can be given from any of the four parameters
$\Delta, \delta, P, p$. Optional keyword arguments lets us choose
whether the field is diagonal, degenerate, logarithmic. The field can
also be defined from its r and s indices using the keyword argument Kac
= true.

1.  Conformal dimensions

    ``` julia
    """Get P from any given parameter"""
    function Pfrom(s::Symbol, x, c::CentralCharge)
        res = @match s begin
            :Δ => sqrt(complex(x - (c.c-1)/24))
            :δ => sqrt(complex(x))
            :P => x
            :p => im*x
        end
        return isreal(res) ? real(res) : res
    end

    """Get all parameters from P"""
    function Pto(s::Symbol, x, c::CentralCharge)
        @match s begin
            :Δ => x^2 + (c.c-1)/24
            :δ => x^2
            :P => x
            :p => -im*x
            :w => -2*cos(oftype(c.β, π)*c.β*x)
        end
    end

    """
        ConformalDimension{T}
    Type for encoding a conformal dimension, and conveniently access its values in all parametrisations
    """
    struct ConformalDimension{T <: Union{AbstractFloat, Complex{Float64}, Complex{BigFloat}}}

        c::CentralCharge{T}
        P::T
        isKac::Bool
        r::Rational
        s::Rational

    end

    function ConformalDimension(c::CentralCharge{T}, sym::Symbol=:P, P=0; Kac=false, r=0, s=0) where {T}
        if Kac
            P = (r*c.β-s/c.β)/2
        else
            P = Pto(:P, Pfrom(sym, P, c), c)
        end
        ConformalDimension{T}(c, P, Kac, r, s)
    end

    function Base.getproperty(d::ConformalDimension, s::Symbol)
        c = getfield(d, :c)
        P = Pto(:P, Pfrom(:P, getfield(d, :P), c), c)
        P = isreal(P) ? real(P) : P
        if s in (:P, :p, :Δ, :δ, :w)
            return Pto(s, P, c)
        else
            return getfield(d, s)
        end
        res = isreal(res) ? real(res) : res
    end
    ```

2.  Fields

    ```` julia
    const left, right = 1, 2


    """
        Field{T}
    Object representing a conformal field.
    Contains the conformal dimensions, and flags saying whether the field has (rational) Kac indices, is degenerate, or diagonal.
    """
    struct Field{T <: Union{AbstractFloat, Complex{Float64}, Complex{BigFloat}}}

        dim::Tuple{ConformalDimension{T}, ConformalDimension{T}}
        isdiagonal::Bool
        isdegenerate::Bool

    end

    """
       TODO: update the examples
        Field(charge, parameter, leftvalue, rightvalue; kwargs...)

    Constructor function for the Field type.

    Given a charge `charge`, one of the four parameters `Δ`, `δ`, `P`, `p` and two values,
    create an object `Field{T}` (where T is the type of the values in `charge`) that represents a
    field of left and right dimensions given by leftvalue and rightvalue in the chosen
    parametrisation.
    If given only one value for the parameters `Δ`, `δ`, `P` or `p`, the field is diagonal by default

    # keyword arguments:

    - `Kac::Bool`: if set to true, the field can be constructed from the values of its r and s
    indices. By convention V_(r,s) has left and right momenta (P_(r,s), P_(r,-s))
    - `r::Rational`,`s::Rational`: used in conjunction to `Kac=true`, must be given rational
    values,
    - `degenerate::Bool`: set to True if the field is degenerate,
    - `diagonal::Bool`: set to True to get a diagonal field ; only the leftvalue needs to be
    given.

    # Examples
    ```julia-repl
    julia> charge = CentralCharge(:b, big(0.5));
    julia> field = Field(charge, Kac=true, r=0, s=1)
    Non-diagonal field with Kac indices r = 0//1, s = 1//1 and (left,right) dimensions:
    Δ = ( 2.5625 + 0.0im, 2.5625 + 0.0im )
      P = ( -0.0 - 1.0im, 0.0 + 1.0im )
    δ = ( 1.0 - 0.0im, 1.0 + 0.0im )
    p = ( -1.0 + 0.0im, 1.0 + 0.0im )
    ```
    ```julia-repl
    julia> charge = CentralCharge(:β, 1.5+im);
    julia> Field(charge, "δ", 2, 3)
    Non-diagonal field with (left, right) dimensions:
    Δ = ( 2.1579142011834325 - 0.6789940828402367im, 3.1579142011834316 - 0.6789940828402367im )
    P = ( 0.0 + 1.4142135623730951im, 0.0 + 1.7320508075688772im )
    δ = ( 2.0000000000000004 + 0.0im, 2.9999999999999996 + 0.0im )
    p = ( 1.4142135623730951 + 0.0im, 1.7320508075688772 + 0.0im )
    ```
    ```julia-repl
    julia> charge = CentralCharge();
    julia> Field(charge, "δ", 1, diagonal=true)
    Diagonal field of dimension:
    Δ = 1.0 + 0.0im
    P = 0.0 + 1.0im
    δ = 1.0 + 0.0im
    p = 1.0 + 0.0im
    ```
    """
    function Field(c::CentralCharge{T}, sym::Symbol=:P, dim=0;
                   Kac=false, r=0, s=0, degenerate=false, diagonal=false) where {T}

        if !Kac
            # diagonal = true # a field not given from Kac indices is diagonal
        end
        if degenerate # degenerate fields are diagonal and must be given from Kac indices
            Kac = true
            diagonal = true
        end
        dim_left = ConformalDimension(c, sym, dim, Kac=Kac, r=r, s=s)
        if diagonal
            dim_right = dim_left
        else
            @assert Kac==true "A non-diagonal field must be given from Kac indices"
            dim_right = ConformalDimension(c, sym, dim_left, Kac=Kac, r=r, s=-s)
        end

        Field{T}((dim_left, dim_right), diagonal, degenerate)
    end

    function Base.getproperty(V::Field, s::Symbol)
        ds = getfield(V, :dim)
        if s === :P
            return ds[left].P, ds[right].P
        elseif s === :Δ
            return ds[left].Δ, ds[right].Δ
        elseif s === :p
            return ds[left].p, ds[right].p
        elseif s === :δ
            return ds[left].δ, ds[right].δ
        elseif s in (:r, :s)
            return getfield(ds[left], s) # by convention V_(r,s) denotes the field with left right dimension P_(r, s), P_(r, -s)
        elseif s === :isKac
            return (V.dim[left].isKac && V.dim[right].isKac && V.dim[left].r == V.dim[left].r && V.dim[left].s == -V.dim[right].s)
        else
            return getfield(V, s)
        end
    end

    # Overload the == operator
    function Base.:(==)(V1::Field, V2::Field)
        return V1.Δ == V2.Δ
    end

    """Compute the spin Δleft - Δright of a field."""
    function spin(V::Field)::Rational
        if V.isdiagonal
            return 0
        elseif V.isKac
            return V.r*V.s
        else # this should never happen
            return V.Δ[1] - V.Δ[2]
        end
    end
    ````

3.  Pretty printing

    ``` julia
    function Base.show(io::IO, d::ConformalDimension)
        if d.isKac
            print(io, "Kac indices r = $(d.r), s=$(d.s)")
        else
            print(io, "Δ = $(d.Δ), P = $(d.P)")
        end
    end

    function Base.show(io::IO, V::Field)
        if V.isdiagonal
            print(io, "Diagonal $(typeof(V)) with ")
            show(V.dim[left])
        else
            println(io, "Non-diagonal $(typeof(V))")
            print(io, "left: ")
            show(V.dim[left])
            print(io, "\nright: ")
            show(V.dim[right])
        end
    end
    ```

### End of module

``` julia
end # end module
```

## The `FourPointCorrelationFunctions` module {#the-fourpointcorrelationfunctions-module header-args:julia=":tangle ./src/CorrelationFunctions.jl"}

The module `FourPointCorrelationFunctions`{.verbatim} defines

-   a struct `FourPointCorrelation`{.verbatim} that represents a four
    point function

    $$
     < V_1(0) V_2(1) V_3(\infty) V_4(x)>
     $$

-   a method `computeCNmn`{.verbatim} that computes the coefficients
    $C^N_{m,n}$ which serve to compute the conformal blocks that enter
    the expansion of the 4-pt function.

Header

``` julia
#===========================================================================================

Written by Paul Roux, adapting a Python code written by Sylvain Ribault & Rongvoram
Nivesvivat

===========================================================================================#

module FourPointCorrelationFunctions

export FourPointCorrelation, computeCNmn

using ..CFTData
using Match
import Memoization: @memoize
```

Four-point correlation type

We create a struct `FourPointCorrelation` for representing a four-point
function on the sphere, that is, a central charge and four external
fields.

``` julia
"""Struct representing a four-point function. Contains
- a central charge
- 4 external fields
"""
struct FourPointCorrelation{T}
    charge::CentralCharge{T}
    fields::Vector{Field{T}}
end

function FourPointCorrelation(c::CentralCharge, V1, V2, V3, V4)
    return FourPointCorrelation(c, [V1, V2, V3, V4])
end

"""Display a four-point function"""
function Base.show(io::IO, corr::FourPointCorrelation)
    print("Four-point correlation function: < V_1 V_2 V_3 V_4 > where ")
    print("\nV_1 = "); show(corr.fields[1])
    print("\nV_2 = "); show(corr.fields[2])
    print("\nV_3 = "); show(corr.fields[3])
    print("\nV_4 = "); show(corr.fields[4])
end

# explicit names for the indices of left and right dimensions
const left = 1
const right = 2
```

Compute $C^N_{m,n}$

The function `permute_ext_fields` permutes the external fields such that
the first two and last two are fused together in the channel.

The function `Rmn_zero_order` computes the order of a zero of R, to
avoid computing 0/0 in $\frac{R_{m,n}}{\delta - \delta_{r,s}}$. At
generic central charge (non-rational) $R_{m,n}$ is zero iff one of the
two pairs of fused fields have Kac indices such that
$r_1 \pm r_2 \in \{1-m, 3-m, \dots, m-1\}$ or
$s_1 \pm s_2 \in \{1-n, 3-n, \dots, n-1\}$.

When $R_{m,n}=0$, we compute a regularisation of it, i.e. the
$O(\epsilon)$ term in the residue of the conformal block where the
channel field\'s dimension is shifted by $\epsilon$.

This is given by (some expression)

$$\begin{align}
&\left(\delta_2-\delta_1\right)_\text{reg} = 2p_2 \\
&\left((\delta_2-\delta_1)^2 -2\delta_{(r,s)}(\delta_1+\delta_2) + \delta_{(r,s)}^2\right)_\text{reg} = 8p_1p_2p_{(r,s)}
\end{align}$$

``` julia
double_prod_in_Dmn(m, n, B) = prod(prod((r^2*B - s^2/B)^2 for s in 1:n-1) for r in 1:m-1)

δrs(r, s, B) = -1/4 * (B*r^2 + 2*r*s + s^2/B)

function Dmn(m, n, B)
    if m == 1 && n == 1 # treat cases m = 1, n=1 separately
        return 1
    elseif m == 1
        return n * prod(s^2/B * (s^2/B - m^2*B) for s in 1:n-1)
    elseif n == 1
        return m * prod(r^2*B * (r^2*B - n^2/B) for r in 1:m-1)
    else
        f1 = prod(r^2*B * (r^2*B - n^2/B) for r in 1:m-1)
        f2 = prod(s^2/B * (s^2/B - m^2*B) for s in 1:n-1)
        f3 = double_prod_in_Dmn(m, n, B)
        return m*n*f1*f2*f3
    end
end

"""Order of a zero of Rmn, assuming the central charge is generic. Also return the indices of the vanishing term."""
function Rmn_zero_order(m, n, corr::FourPointCorrelation)
    B = corr.charge.B
    order = 0
    V=corr.fields

    if !((V[1].isKac && V[2].isKac) || (V[3].isKac && V[4].isKac))
        return 0
    end

    r=[V[i].r for i in 1:4]
    s=[V[i].s for i in 1:4]

    #= Rmn is zero if r1 \pm r2 or r3 \pm r4 is an integer in 1-m:2:m-1, and
    s1 \pm s2 or s3 \pm s4 is an integer in 1-n:2:n-1.
    equivalently, if (|r1 \pm r2| <= m-1 and r1-r2 - (m-1) % 2 == 0)
    and (|s1 \pm s2| <= n-1 and s1-s2 - (n-1) % 2 == 0)
    =#
    for pm in (-1,1)
        for (i,j) in ((1,2), (3,4))
            if V[i].isKac && V[j].isKac
                if (abs(r[i]+pm*r[j]) <= m-1 && (r[i]+pm*r[j]-(m-1))%2 == 0) &&
                    (abs(s[i]+pm*s[j]) <= n-1 && (s[i]+pm*s[j]-(n-1))%2 == 0)
                    order += 1
                end
            end
        end
    end

    return order
end

"""Compute one of the terms in the double product of Rmn"""
function Rmn_term(r, s, corr::FourPointCorrelation, lr)
    B = corr.charge.B
    V = corr.fields
    δ = [V[i].δ[lr] for i in 1:4]
    if r != 0 || s != 0
        return (((δ[2]-δ[1])^2 - 2*δrs(r, s, B)*(δ[1]+δ[2]) + δrs(r, s, B)^2)
                *((δ[3]-δ[4])^2 - 2*δrs(r, s, B)*(δ[3]+δ[4]) + δrs(r, s, B)^2))
    else
        return (δ[2]-δ[1])*(δ[3]-δ[4])
    end
end

"""Compute the regularization of a term in the double product of Rmn"""
function Rmn_term_reg(r, s, corr::FourPointCorrelation, lr)
    V = corr.fields
    if r != 0 || s != 0
        return 8*V[1].P[lr]*V[2].P[lr]*Field(corr.charge, Kac=true, r=r, s=s)
    else
        return 2*V[2].P[lr]
    end
end

"""
Compute `Rmn`.
lr indicates the left or right moving parts of the fields
Cache the result.
TODO: value of regularisation
"""
@memoize function Rmn(m, n, corr::FourPointCorrelation, lr)

    if Rmn_zero_order(m, n, corr) == 0
        if m == 1
            res = prod(Rmn_term(0, s, corr, lr) for s in 1-n:2:0)
        else # m > 1
            res = prod(prod(Rmn_term(r, s, corr, lr)
                            for s in 1-n:2:n-1) for r in 1-m:2:-1)
            if m%2 == 1 # m odd -> treat r=0 term separately
                res *= prod(Rmn_term(0, s, corr, lr) for s in 1-n:2:0)
            end
        end
    else
        if m == 1
            res = 0
        end
    end

    return res/(2*Dmn(m, n, corr.charge.B))
end

@memoize function computeCNmn(N, m, n, corr::FourPointCorrelation, lr)
    B = corr.charge.B
    if Rmn_zero_order(m, n, corr) > 0
        return 0
    elseif m*n > N
        return 0
    elseif m*n == N
        return Rmn(m, n, corr, lr)
    else
        res = sum(sum(computeCNmn(N-m*n, mp, np, corr, lr)/(δrs(m, -n, B) - δrs(mp, np, B))
                      for mp in 1:N-m*n if mp*np <= N-m*n)
                  for np in 1:N-m*n)
        return Rmn(m, n, corr, lr) * res
    end
end
```

End module

``` julia
end # end module
```

## The `OnePointCorrelationFunctions` module {#the-onepointcorrelationfunctions-module header-args:julia=":tangle ./src/CorrelationFunctions.jl"}

The module `OnePointCorrelationFunctions`{.verbatim} defines

-   a struct `OnePointCorrelation`{.verbatim} that represents a one
    point function $$
     < V >,
     $$
-   a method `computeCNmn`{.verbatim} that computes the coefficients
    $C^{N,\text{torus}}_{m,n}$ which serve to compute the conformal
    blocks that enter the expansion of the 1-pt function.

Header

``` julia
module OnePointCorrelationFunctions

export OnePointCorrelation, computeCNmn

using ..CFTData
import ..FourPointCorrelationFunctions: Dmn, δrs # re-use the Dmn from four-point functions
```

One-point function type

``` julia
struct OnePointCorrelation{T}
    charge::CentralCharge{T}
    field::Field{T}
end

"""Display a one-point function"""
function Base.show(io::IO, corr::OnePointCorrelation)
    println("One-point correlation function: < V > where ")
    print("V = "); show(corr.field)
end
```

Compute $C^{N,\text{torus}}_{m,n}$

The computation of the $C^{N,\text{torus}}_{m,n}$ is very similar to
that of the [*coefficients $C^{N}_{m,n}$*]{.spurious-link
target="*Compute $C^N_{m,n}$"}. We re-use much of the code.

``` julia
"""Order of a pole of Rmn^torus, assuming the central charge is generic"""
function Rmn_zero_order(m, n, corr::OnePointCorrelation)
    B = corr.charge.B
    V = corr.field
    if V.isKac && V.r%2==1 && V.s%2==1 && abs(V.r) <= 2*m-1 && abs(V.s) <= 2*n-1
        return 1
    end
    return 0
end

"""
Compute `Rmn^torus`.
lr indicates the left or right moving parts of the fields
TODO: value of regularisation
"""
function Rmn(m, n, corr::OnePointCorrelation, lr)
    B = corr.charge.B
    V = corr.field
    δ1 = V.δ[lr]
    if Rmn_zero_order(m, n, corr) > 0
        return 0
    else
        res = prod(prod(δrs(r, s, B) - δ1 for r in 1:2:2*m-1) for s in 1-2n:2:2n-1)
        return res/(2*Dmn(m, n, B))
    end
end

function computeCNmn(N, m, n, corr::OnePointCorrelation, lr)
    B = corr.charge.B
    if Rmn_zero_order(m, n, corr) > 0
        return 0
    elseif m*n > N
        return 0
    elseif m*n == N
        return Rmn(m, n, corr, lr)
    else
        res = sum(sum(computeCNmn(N-m*n, mp, np, corr, lr)/(δrs(m, -n, B)-δrs(mp, np, B))
                      for mp in 1:N-m*n if mp*np <= N-m*n)
                  for np in 1:N-m*n)
        return Rmn(m, n, corr, lr) * ((N-m*n==0)+res)
    end
end
```

End module

``` julia
end # end module
```

## The `FourPointBlocksSphere` module {#the-fourpointblockssphere-module header-args:julia=":tangle ./src/ConformalBlocks.jl"}

The module `FourPointBlocksSphere` exports

-   a struct `FourPointBlockSphere` that encapsulates the data needed to
    compute a 4pt conformal block, namely a channel, four external
    fields and the field propagating in the channel
-   a function
    `block_chiral(x, Nmax, block::FourPointBlockSphere, corr::FourPointCorrelation, lr)`
    which computes the value of the non-chiral block
    $\mathcal F_{\Delta}^{(s)}(\Delta_i | x)$ as defined in [*this
    paragraph*]{.spurious-link
    target="*Zamolodchikov's recursion for four-point blocks"}.
-   a function
    `block_non_chiral(x, Nmax, block::FourPointBlockSphere, corr::FourPointCorrelation)`
    which computes the value of the non-chiral block
    $\mathcal G_{\Delta}^{(s)}(\Delta_i | x)$ as defined in [*this
    paragraph*]{.spurious-link
    target="*Zamolodchikov's recursion for four-point blocks"}.

### Header {#header-4}

``` julia
#===========================================================================================

ConformalBlocks.jl contains modules that compute Virasoro four-point conformal blocks on the
sphere and Virasoro one-point conformal blocks on the torus.

Written by Paul Roux, adapting a Python code written by Sylvain Ribault & Rongvoram
Nivesvivat

===========================================================================================#


"""
Computation of four-point blocks on the sphere.
"""
module FourPointBlocksSphere

export FourPointBlockSphere, block_chiral, block_non_chiral

using ..CFTData, ..FourPointCorrelationFunctions
using Match, EllipticFunctions, Memoization
import ..FourPointCorrelationFunctions: Rmn
import ..BootstrapVirasoro.SpecialFunctions: digamma_reg

# explicit names for the indices of left and right dimensions
const left = 1
const right = 2
```

### Four-point block sphere type

```` julia
#===========================================================================================
Struct FourPointBlockSphere
===========================================================================================#
"""
    FourPointBlockSphere{T}

Composite type that represents a four-point conformal block:
a channel and a field propagating in the channel. The external fields and central charge are
provided in a `FourPointCorrelation` object.

# Example

```julia-repl
julia> c = CentralCharge(:c,0.5); V = Field(c, :δ, 0.6, diagonal = true);
julia> FourPointBlockSphere(:s, V)
Four-point block
Channel:        s
Channel Field:
Diagonal field of dimension:
  Δ = 0.5791666666666667 + 0.0im
  P = 0.0 + 0.7745966692414834im
  δ = 0.6000000000000001 + 0.0im
  p = 0.7745966692414834 + 0.0im
```
"""
struct FourPointBlockSphere{T}

    corr::FourPointCorrelation{T}
    channel::Symbol
    channelfield::Field{T}
    _seriescoeffs_lr::Tuple{Dict{Tuple{Int, Int, Int}, T}, Dict{Tuple{Int, Int, Int}, T}}
    _Nmax::Int

end

"""Permute the external fields to get t- or u-channels from s-channel."""
function permute_ext_fields(corr::FourPointCorrelation, chan::Symbol)::FourPointCorrelation
    Vs=corr.fields
    Vs = @match chan begin
        :s => [Vs[1], Vs[2], Vs[3], Vs[4]]
        :t => [Vs[1], Vs[4], Vs[3], Vs[2]]
        :u => [Vs[1], Vs[3], Vs[2], Vs[4]]
        _ => error("The parameter $chan is not a valid channel")
    end
    return FourPointCorrelation(corr.charge, Vs)
end


function FourPointBlockSphere(corr::FourPointCorrelation{T}, s::Symbol, V::Field{T}; Nmax=10) where {T}
    corr_permuted = permute_ext_fields(corr, s)
    coeff_left = Dict{Tuple{Int,Int,Int}, T}( ((N, m, n) => computeCNmn(N, m, n, corr_permuted, left))
                       for n in 1:Nmax for m in 1:Nmax for N in 1:Nmax
                           if m*n <= N)
    coeff_right = Dict{Tuple{Int,Int,Int}, T}( ((N, m, n) => computeCNmn(N, m, n, corr_permuted, right))
                        for n in 1:Nmax for m in 1:Nmax for N in 1:Nmax
                            if m*n <= N)
    return FourPointBlockSphere(corr_permuted, s, V, (coeff_left, coeff_right), Nmax)
end

function Base.show(io::IO, block::FourPointBlockSphere)
    print("Four-point block, for the ")
    show(block.corr); print("\n")
    println("Channel:\t$(block.channel)")
    println("Channel Field:")
    show(block.channelfield)
end
````

### Change of channel

The $t$ and $u$ channel blocks are computed from the $s$ channel one,
using [*the relation*]{.spurious-link target="tu-from-s"} described
above.

``` julia
#===========================================================================================
Get t- and u- channel blocks from s-channel block
===========================================================================================#
"""Prefactor to get t- or u-channel blocks from the s-channel block"""
function channelprefactor_chiral(block::FourPointBlockSphere, x)
    @match block.channel begin
        :s => 1
        :t => 1
        :u => 1/x^(-2*block.corr.fields[1].Δ[left])
    end
end

function channelprefactor_non_chiral(block::FourPointBlockSphere, x)
    return channelprefactor_chiral(block, x)*channelprefactor_chiral(block, conj(x))
end

"""Sign (-1)^{S_1+S_2+S_3+S_4} when changing from s to t or u channels"""
function channel_sign(block::FourPointBlockSphere, x)
    @match block.channel begin
        :s => 1
        :t => 1 # (-1)^(sum(spin.(corr.fields)))
        :u => 1 # (-1)^(sum(spin.(corr.fields)))
    end
end

"""Cross-ratio at which to evaluate the s-channel block to get t- or u-channel block"""
function crossratio(channel, x)
    @match channel begin
        :s => x
        :t => 1-x
        :u => 1/x
    end
end
```

### Prefactors, elliptic nome

The nome $q$ is related to $x$ via

$$\begin{align}
q(x) = \exp(-\pi \frac{K(1-x)}{K(x)})
\end{align}$$

where $K$ is the elliptic $K$ function. The inverse of this relation is

$$\begin{align}
x(q) = \left(\frac{\theta_{4}(q)}{\theta_{3}(q)}\right)^{2}
\end{align}$$

``` julia
#===========================================================================================
Set prefactors, relate the cross-ratio x and the elliptic nome q
===========================================================================================#
"""Nome `q` from the cross-ratio `x`"""
qfromx(x) = exp(-oftype(x, π)*ellipticK(1-x)/ellipticK(x))

"""Cross ratio `x` from the nome `q`"""
xfromq(q) = jtheta2(0,q)^4 / jtheta3(0,q)^4

"""Prefactor for getting the block F from H. The argument `lr` indicates if we are working
with a left or right moving block"""
function blockprefactor(block::FourPointBlockSphere, x, lr)

    corr = block.corr
    c = corr.charge.c
    e0 = - corr.fields[1].δ[lr] - corr.fields[2].δ[lr] - (c-1)/24
    e1 = - corr.fields[1].δ[lr] - corr.fields[4].δ[lr] - (c-1)/24
    e2 = sum(corr.fields[i].δ[lr] for i in 1:4) + (c-1)/24
    q=qfromx(x)

    return Complex(x)^e0 * (Complex(1-x))^e1 * jtheta3(0,q)^(-4*e2) * (16*q)^block.channelfield.δ[lr]
end

"""Degenerate dimensions"""
δrs(r, s, B) = -1/4 * (B*r^2 + 2*r*s + s^2/B)
```

### Logarithmic structure constant $\ell$

``` julia
βm1P(B, r, s) = 1/2*(r+s/B) # \beta^{-1}P_{(r,s)}

"""Factor \ell_{(r,s)} that appears in logarithmic blocks"""
function ell(corr, r, s)
    c = corr.charge
    B, β = c.B, c.β
    βm1P_ext = [[corr.fields[i].P[left]/β for i in 1:4], [corr.fields[i].P[right]/β for i in 1:4]]

    term1(j) = digamma_reg(-2*βm1P(B, r, j)) + digamma_reg(2*βm1P(B, r, -j))

    res = -big(4)*oftype(B, π)/tan(oftype(B, π)*s/B)

    term3(j, lr, pm1, pm2, a, b) = digamma_reg(1/2 + (lr == left ? -1 : 1)*βm1P(B, r, j) + pm1*βm1P_ext[lr][a] + pm2*βm1P_ext[lr][b])

    return res + 4*sum(term1(j) for j in 1-s:s) -
        sum(term3(j, lr, pm1, pm2, a, b)
                        for pm1 in (-1,1)
                        for pm2 in (-1,1)
                        for j in 1-s:2:s-1
                        for (a,b) in ((1,2), (3, 4))
                        for lr in (left, right)
        )
end
```

### Zamolodchikov recursion

``` julia
function H_series_coeffN(block, lr, N;
                         der=false, reg=false)

    V = block.channelfield
    P = V.P[lr]
    β = block.corr.charge.β

    res = 0
    if !reg && !der
        for m in 1:N
            for n in 1:N
                if m*n <= N
                    Pmn = (β*m-n/β)/2
                    res += block._seriescoeffs_lr[lr][(N, m, n)]/(P^2-Pmn^2)
                end
            end
        end
        return res
    elseif !reg && der
        for m in 1:N
            for n in 1:N
                if m*n <= N
                    Pmn = (β*m-n/β)/2
                    res -= block._seriescoeffs_lr[lr][(N, m, n)]/(P^2-Pmn^2)^2
                end
            end
        end
        return 2*P*res
    elseif reg && V.isKac && V.r%1 == V.s%1 == 0 && V.r > 0 && (lr == left && V.s > 0 || lr == right && V.s < 0)
        for m in 1:N
            for n in 1:N
                if m*n <= N
                    Pmn = (β*m-n/β)/2
                    if m != V.r || n != abs(V.s)
                        res += block._seriescoeffs_lr[lr][(N, m, n)]/(P^2-Pmn^2)
                    else
                        res -= block._seriescoeffs_lr[lr][(N, m, n)]/(4*P^2)
                    end
                end
            end
        end
        return res
    else
        error("Trying to compute the derivative of a regularised block")
    end
end

"""
    H_series(block, lr;
      der = false, reg = false)

Compute the coefficients of the series expansion of the function ``H(q,δ)``. If der=true, compute instead the series of the derivative of H with respect to P. If reg=true, compute instead the P dependent part of the coefficients of ``H^{\\text{reg}}``.
"""
@memoize function H_series(block::FourPointBlockSphere, lr;
                  der=false, reg=false)

    @assert !(der && reg) "you should not compute the derivative of a regularised block"

    if !der
        return vcat(1, [H_series_coeffN(block, lr, N, der=der, reg=reg) for N in 1:block._Nmax]) # H = 1 + series
    else
        return [H_series_coeffN(block, lr, N, der=der, reg=reg) for N in 1:block._Nmax]
    end
end
```

### Computation of the block

We compute $H^{\text{der}}_{P}$ as

$$\begin{align}
H_{P}^{\text{der}} &= 2P\log(16q) H_{P} + H_{P}'
\end{align}$$

``` julia
#===========================================================================================
Compute the conformal block
===========================================================================================#
"""
    block_chiral(x, Nmax, block, lr)

Compute the chiral conformal block

``\\mathcal F^{(\\text{chan})}_{\\delta}(x)``

where `chan` is `s`, `t`, or `u`."""
function block_chiral(x, block::FourPointBlockSphere, lr;
                      der=false, reg=false)
    chan = block.channel
    P = block.channelfield.P[lr]
    x_chan = crossratio(chan, x)

    q = qfromx(x_chan)
    h = evalpoly(16*q, H_series(block, lr, der=der, reg=reg))
    if reg
        V = block.channelfield
        # h += log(sq)*sum(block._seriescoeffs_lr[lr](N, V.r, abs(V.s))*(sq)^N for N in V.r*abs(V.s):block.Nmax) # log(16q) term in log(16q) - 1/4P^2
        h += log(16*q)*(16*q)^(V.r*abs(V.s))*evalpoly(16*q, [block._seriescoeffs_lr[lr][(N, V.r, abs(V.s))] for N in V.r*abs(V.s):block._Nmax]) # log(16q) term in log(16q) - 1/4P^2
    elseif der
        h += 2*P*log(16*q)*evalpoly(16*q, H_series(block, lr, der=false)) # H^der = 2Plog(16q)H + H'
    end

    return channelprefactor_chiral(block, x_chan) * blockprefactor(block, x_chan, lr) * h
end

block_chiral(x, block, lr; der=false, reg=false) = block_chiral(x, block, lr; der=der, reg=reg)

"""
    block_non_chiral(x, Nmax, block)

Compute the non-chiral conformal block G_(r,s) in the s channel.

TODO: regularise R_(r,s) / \bar{R}_(r,s)
"""
function block_non_chiral(x, block::FourPointBlockSphere)

    x_chan = crossratio(block.channel, x)
    Vchan = block.channelfield

    if !Vchan.isKac || (Vchan.isKac && (Vchan.r%1 != 0 || Vchan.s%1 != 0 || spin(Vchan) == 0)) # non-logarithmic block

        return block_chiral(x_chan, block, left) * block_chiral(conj(x_chan), block, right)

    elseif 0 == 1 # accidentally non-logarithmic block
        return
    else
        # logarithmic block
        corr = block.corr

        r, s = Vchan.r, Vchan.s

        @assert !(Vchan.r < 0 || Vchan.s < 0) "Trying to compute a logarithmic block with a negative index: r=$(Vchan.r), s=$(Vchan.s) .
                                               This goes against the chosen convention"
        c = corr.charge
        block1 = block
        block2 = FourPointBlockSphere(corr, :s, Field(c, Kac=true, r=r, s=-s), Nmax=block._Nmax) # block with momenta (P_(r,-s), P_(r,s)) in the channel

        F_Prms = block_chiral(x_chan, block2, left) # F_{P_(r,-s)}
        F_Prms_bar = block_chiral(conj(x_chan), block1, right) # \bar F_{P_(r,-s)}
        F_der_Prms = block_chiral(x_chan, block2, left, der=true) # F'_{P_(r,-s)}
        F_der_Prms_bar = block_chiral(conj(x_chan), block1, right, der=true) # \bar F'_{P_(r,-s)}
        F_reg_Prs = block_chiral(x_chan, block1, left, reg=true) # F^reg_{P_(r,s)}
        F_reg_Prs_bar = block_chiral(conj(x_chan), block2, right, reg=true) # \bar F^reg_{P_(r,s)}

        R = Rmn(r, s, corr, left) # Vchan.P[left] = P_(r,s)
        R_bar = Rmn(r, s, corr, right)

        term1 = (F_reg_Prs - R*F_der_Prms)*F_Prms_bar
        term2 = R/R_bar*F_Prms*(F_reg_Prs_bar - R_bar*F_der_Prms_bar)
        term3 = -R*ell(corr, r, s)*F_Prms*F_Prms_bar

        # return F_Prms, F_Prms_bar, F_der_Prms, F_der_Prms_bar, F_reg_Prs, F_reg_Prs_bar, ell(corr, r, s), R, R_bar
        return channel_sign(block, x)*(term1+term2+term3)
    end
end

"""
    block_non_chiral(x, Nmax, block, corr)

Compute the non-chiral conformal block G_(r,s) in the channel indicated in `block`.

TODO: regularise R_(r,s) / \bar{R}_(r,s)
"""
```

### End of module

``` julia
end # end module
```

## Setting-up bootstrap equations {#setting-up-bootstrap-equations header-args:julia=":tangle ./src/BootstrapEquations.jl"}

### Multithreading

Setting-up bootstrap equations requires evaluating conformal blocks at
hundreds of positions. We parallelize this computation.

``` {.julia session="test" results="silent"}
using Pkg; Pkg.activate(".")
using BootstrapVirasoro

help(Field)
```

``` julia
function evaluate_block(positions, Nmax, corr, block)
    res = zeros(length(positions))
    threads.@Threads for (i,pos) in enumerate(positions)
        res[i] = G(corr, block, pos)
    end
end
```

## Unit testing {#unit-testing header-args:julia=":tangle ./test/runtests.jl"}

``` julia
using BootstrapVirasoro
using Test
```

### CFTData

``` julia
@testset "CFTData.jl" begin

    #ensure the relation between b and β does not change
    c1 = CentralCharge(:c, -1.1+.2im)
    b = c1.b
    c2 = CentralCharge(:b, b)
    @test c1.c == c2.c
    @test c1.β == c2.β

    #ensure the relation between p and P does not change
    left = 1
    right = 2
    V1 = Field(c1, :P, 0.5, diagonal=true)
    p = V1.P[left]
    V2 = Field(c1, :P, p, diagonal=true)
    @test V1.P == V2.P

    #ensure the keyword diagonal also works for fields given from Kac indices
    V1 = Field(c1, Kac=true, r=3, s=4, diagonal=true)
    @test V1.δ[left] == V1.δ[right]


    #ensure degenerate and diagonal work well together
    V1 = Field(c1, Kac=true, degenerate=true, r=2, s=5, diagonal=true)
    @test V1.δ[left] == V1.δ[right]

end
```

### Four-point correlation functions

``` julia
@testset "FourPointCorrelationFunctions" begin

    left=1
    right=2

    c = CentralCharge(:β, 1.2+.1*1im)
    V1 = Field(c, :Δ, big"0.23"+big".11"*im, diagonal=true)
    V2 = Field(c, :Δ, 3.43, diagonal=true)
    V3 = Field(c, :Δ, 0.13, diagonal=true)
    V4 = Field(c, :Δ, 1.3, diagonal=true)
    corr = FourPointCorrelation(c, V1, V2, V3, V4)

    @test isapprox(BootstrapVirasoro.FourPointCorrelationFunctions.Rmn(2, 1, corr, left),
                   0.31097697185245077-0.70523695127635733im, # value taken from Sylvain's code
                   atol=1e-8)

    @test isapprox(BootstrapVirasoro.FourPointCorrelationFunctions.computeCNmn(7, 2, 3, corr, left),
                   0.0019498393368877166+0.0026353877950837049im, # value taken from Sylvain's code
                   atol=1e-8)

end
```

### Four-point blocks

1.  Boilerplate

    ``` julia

    @testset "FourPointBlocks" begin

        left=1;
        right=2;

        import BootstrapVirasoro.FourPointBlocksSphere.qfromx

    ```

2.  Series $H$

    ``` julia
    c = CentralCharge(:b, (1.2+.1*1im)/sqrt(2))

    q = BootstrapVirasoro.FourPointBlocksSphere.qfromx(0.05)

    P = 0.23+.11im
    P1 = 0.41+1.03im

    V_chan = Field(c, :P, sqrt(2)*P, diagonal=true)
    V_ext = Field(c, :P, P1/sqrt(2), diagonal=true)
    VKac = Field(c, Kac=true, r=0, s=1//2, diagonal=true)

    corr = FourPointCorrelation(c, [VKac, V_ext, VKac,VKac])
    block = FourPointBlockSphere(corr, :s, V_chan)

    h = evalpoly(16*q, BootstrapVirasoro.FourPointBlocksSphere.H_series(block, left))

    @test isapprox(h, 0.9999955375834808 - 2.735498726466085e-6im, atol=1e-8) # value from Sylvain's code
    ```

3.  Prefactors, change of channel

    ``` julia
    setprecision(BigFloat, 128)

    c = CentralCharge(:c, big"0.1")
    V1 = Field(c, :Δ, 1, diagonal=true)
    V2 = Field(c, :Δ, 2, diagonal=true)
    V3 = Field(c, :Δ, 3, diagonal=true)
    V4 = Field(c, :Δ, 4, diagonal=true)
    corr = FourPointCorrelation(c, V1, V2, V3, V4)
    V = Field(c, :Δ, big"0.5", diagonal=true)
    block_s = FourPointBlockSphere(corr, :s, V, Nmax=50)
    block_t = FourPointBlockSphere(corr, :t, V, Nmax=50)
    block_u = FourPointBlockSphere(corr, :u, V, Nmax=50)
    x=big"0.05"

    # comparing to values from Sylvain's code
    @test isapprox(block_chiral(x, block_s, left), big"1679.9121886897846270816517306779666391454311387606437056866150367", rtol = 1e-20)
    @test isapprox(block_chiral(x, block_t, left), big"10841.2576587560092582414458316202779244541207",rtol = 1e-20)
    @test isapprox(block_chiral(x, block_u, right), big"299.1846813850886027170806472436222922268361198327" -big"2026.4731585077561510727121083232012071890514123"*im, rtol = 1e-20)
    ```

4.  Asymptotics

    ``` julia
    setprecision(BigFloat, 64)
    left = 1
    right = 2

    c = CentralCharge(:β, big".912" + .1im)
    V1 = Field(c, Kac=true, r=1//2, s=0)
    V2 = Field(c, Kac=true, r=3//2, s=2//3)

    corr = FourPointCorrelation(c, [V1, V1, V2, V1])
    block_s = FourPointBlockSphere(corr, :s, V1, Nmax=15)
    block_t = FourPointBlockSphere(corr, :t, V1, Nmax=15)

    z = 1e-8 + 1e-10im
    Δ1 = V1.Δ[left]

    @test abs(1-block_non_chiral(z, block_s)*z^Δ1*conj(z)^Δ1) < 1e-5
    @test abs(1-block_non_chiral(1-z, block_t)*z^Δ1*conj(z)^Δ1) < 1e-5 # both blocks are close to one

    ```

5.  Derivative

    ``` julia
    setprecision(BigFloat, 256)

    c = CentralCharge(:β, big(1.2 + .1im))
    V1 = Field(c, Kac=true, r=1//2, s=0)
    V2 = Field(c, Kac=true, r=3//2, s=2//3)

    ϵ = big(1e-25)
    V = Field(c, :Δ, 0.5, diagonal=true)
    Vshiftedp = Field(c, :Δ, 0.5+ϵ, diagonal=true)
    Vshiftedm = Field(c, :Δ, 0.5-ϵ, diagonal=true)

    corr = FourPointCorrelation(c, [V1, V1, V2, V1])
    block = FourPointBlockSphere(corr, :s, V, Nmax=50)
    block_shiftedp = FourPointBlockSphere(corr, :s, Vshiftedp, Nmax=50)
    block_shiftedm = FourPointBlockSphere(corr, :s, Vshiftedm, Nmax=50)

    block_der = block_chiral(z, block, left, der=true)
    block_der_manual = (block_chiral(z, block_shiftedp, left) - block_chiral(z, block_shiftedm, left))/(2*ϵ)

    @test abs(block_der - block_der_manual) < 1e-6
    ```

6.  Logarithmic blocks

    ``` julia
    c = CentralCharge(:β, big(.8 + .1im))
    V1 = Field(c, Kac=true, r=1, s=1)
    V2 = Field(c, Kac=true, r=1, s=1)
    V3 = Field(c, Kac=true, r=0, s=1//2)
    V4 = Field(c, Kac=true, r=0, s=3//2)
    VΔ = Field(c, :Δ, 0.5, diagonal=true)

    corr = FourPointCorrelation(c, [V1, V2, V3, V4])
    corrΔ = FourPointCorrelation(c, [V1, V2, V3, VΔ])

    ell = BootstrapVirasoro.FourPointBlocksSphere.ell(corr, 2, 1)
    ellΔ = BootstrapVirasoro.FourPointBlocksSphere.ell(corrΔ, 2, 1)

    # When all fields are degenerate
    @test  isapprox(ell, 8.2808044631395529307 - 9.7096599503345083802im, rtol = 1e-8) # comparing with Sylvain's code
    # When not all fields are degenerate
    @test isapprox(ellΔ, 11.392850199938978801 - 7.6477614372039684265im, rtol = 1e-8) # comparing with Sylvain's code

    c = CentralCharge(:β, big(1.2 + .1im))
    V1 = Field(c, Kac=true, r=0, s=1)
    V2 = Field(c, Kac=true, r=0, s=1//2)
    V3 = Field(c, Kac=true, r=0, s=1)
    V4 = Field(c, Kac=true, r=0, s=1//2)

    V = Field(c, Kac=true, r=2, s=3)

    x = 0.3 + 0.1im
    Nmax = 26
    corr = FourPointCorrelation(c, [V1, V2, V3, V4])
    b(channel) = FourPointBlockSphere(corr, channel, V)
    block_value(b) = block_non_chiral(x, b)

    @test isapprox(block_value(b(:s)), -0.0062116451268237 + 0.0009314731786393im, rtol = 1e-5) # comparing with Sylvain's code
    @test isapprox(block_value(b(:t)), -0.15830875034149818 - 0.130335270628475im, rtol = 1e-5) # comparing with Sylvain's code
    @test isapprox(block_value(b(:u)), 296.0639291056886 - 16.68222738906im, rtol = 1e-3) # comparing with Sylvain's code:TODO precision problem

    end
    ```

### One-point blocks

1.  Comparing against sphere four-point blocks

    ``` julia
    @testset "OnePointBlocks" begin
        left=1;
        right=2;

        import BootstrapVirasoro.FourPointBlocksSphere.qfromx
        c_torus = CentralCharge(:b, 1.2+.1*1im);
        c_sphere = CentralCharge(:b, (1.2+.1*1im)/sqrt(2))

        q = BootstrapVirasoro.FourPointBlocksSphere.qfromx(0.05)

        P = 0.23+.11im
        P1 = 0.41+1.03im
        V_torus_chan = Field(c_torus, :P, P, diagonal=true)
        δ_torus = V_torus_chan.δ[left]
        δ11_torus = Field(c_torus, Kac=true, r=1, s=1, diagonal=true).δ[left]
        V_torus_ext = Field(c_torus, :P, P1, diagonal=true)

        V_sphere_chan = Field(c_sphere, :P, sqrt(2)*P, diagonal=true)
        δ_sphere = V_sphere_chan.δ[left]
        δ21_sphere = Field(c_sphere, Kac=true, r=2, s=1, diagonal=true).δ[left]
        δ12_sphere = Field(c_sphere, Kac=true, r=1, s=2, diagonal=true).δ[left]
        V_sphere_ext = Field(c_sphere, :P, P1/sqrt(2), diagonal=true)
        VKac_sphere = Field(c_sphere, Kac=true, r=0, s=1//2, diagonal=true)

        corr_torus = OnePointCorrelation(c_torus, V_torus_ext)
        block_torus = OnePointBlockTorus(V_torus_chan)

        corr_sphere = FourPointCorrelation(c_sphere, [VKac_sphere, V_sphere_ext, VKac_sphere,VKac_sphere])
        block_sphere = FourPointBlockSphere(:s, V_sphere_chan)

        h1 = BootstrapVirasoro.OnePointBlocksTorus.H(q^2, 5, block_torus, corr_torus, left)
        h2 = BootstrapVirasoro.FourPointBlocksSphere.H(q, 5, block_sphere, corr_sphere, left)

        @test isapprox(h1, h2, atol=1e-12)
    end
    ```

## Development tests {#development-tests header-args:julia=":tangle ./test/devtests.jl :session test"}

``` {.julia results="silent"}
import Pkg; Pkg.activate(".")
using BootstrapVirasoro
```

``` {.julia results="silent"}
using BootstrapVirasoro, BenchmarkTools, EllipticFunctions

left=1;
right=2;

c = CentralCharge(:β, big(1.2+.1*1im));
V1 = Field(c, :Δ, 0.23+.11im, diagonal=true);
V2 = Field(c, :Δ, 3.43, diagonal=true);
V3 = Field(c, :Δ, 0.13, diagonal=true);
V4 = Field(c, :Δ, 1.3, diagonal=true);
V = Field(c, :Δ, 0.1, diagonal = true);

x = BigFloat("0.05", RoundUp);
function test()
    corr = FourPointCorrelation(c, V1, V2, V3, V4)
    block = FourPointBlockSphere(:s, V)
    calc = BootstrapVirasoro.FourPointBlocksSphere.block_chiral_schan(x, 20, block, corr, left);
end;
```

``` {.julia results="output" exports="both" eval="never-export"}
@btime test()
```

``` example
  90.034 ms (1095792 allocations: 59.37 MiB)
2337.403811916126625122326580582469276291308611169647345129357174845040805086673 + 4771.391284704253687680894658772605764303477461447331028240571631385564211692817im
```

### Relation between four-point blocks on the sphere and one-point blocks on the torus

Four point blocks on the sphere are related to one-point blocks on the
torus through the relation

$$
\mathcal H^{\text{torus}}_{c, P}(P_{1} | q^{2}) = \mathcal H_{c', \sqrt{2}P'}\left(\left. P'_{(0,\frac12)}, \left(\frac{P_{1}}{\sqrt{2}}\right)', P'_{(0,\frac12)}, P'_{(0,\frac12)} \right| q \right)
$$

where

-   $c'$ is related to $c$ via $\beta'=\frac\beta{\sqrt 2}$.
-   $P'$ denotes the Virasoro module with primary field of dimension
    $\Delta'(P') = \frac{c'-1}{24} - P'^{2}$

``` {.julia results="silent"}
import Pkg; Pkg.activate(".")
using BootstrapVirasoro, BenchmarkTools, EllipticFunctions

left=1;
right=2;

import BootstrapVirasoro.FourPointBlocksSphere.qfromx
c_torus = CentralCharge(:b, 1.2+.1*1im);
c_sphere = CentralCharge(:b, (1.2+.1*1im)/sqrt(2))

q = BootstrapVirasoro.FourPointBlocksSphere.qfromx(0.05)

P = 0.23+.11im
P1 = 0.41+1.03im
V_torus_chan = Field(c_torus, :P, P, diagonal=true)
δ_torus = V_torus_chan.δ[left]
δ11_torus = Field(c_torus, Kac=true, r=1, s=1, diagonal=true).δ[left]
V_torus_ext = Field(c_torus, :P, P1, diagonal=true)

V_sphere_chan = Field(c_sphere, :P, sqrt(2)*P, diagonal=true)
δ_sphere = V_sphere_chan.δ[left]
δ21_sphere = Field(c_sphere, Kac=true, r=2, s=1, diagonal=true).δ[left]
δ12_sphere = Field(c_sphere, Kac=true, r=1, s=2, diagonal=true).δ[left]
V_sphere_ext = Field(c_sphere, :P, P1/sqrt(2), diagonal=true)
VKac_sphere = Field(c_sphere, Kac=true, r=0, s=1//2, diagonal=true)

corr_torus = OnePointCorrelation(c_torus, V_torus_ext)
block_torus = OnePointBlockTorus(V_torus_chan)

corr_sphere = FourPointCorrelation(c_sphere, [VKac_sphere, V_sphere_ext, VKac_sphere,VKac_sphere])
block_sphere = FourPointBlockSphere(:s, V_sphere_chan)

h1 = BootstrapVirasoro.OnePointBlocksTorus.H(q^2, 5, block_torus, corr_torus, left)
h2 = BootstrapVirasoro.FourPointBlocksSphere.H(q, 5, block_sphere, corr_sphere, left)
```

``` {.julia results="output"}
println("torus block = $h1 \nsphere block = $h2")
```
