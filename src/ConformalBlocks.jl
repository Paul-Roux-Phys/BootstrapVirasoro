#===========================================================================================

ConformalBlocks.jl contains modules that compute series expansions for
Virasoro four-point conformal blocks on the sphere and Virasoro one-point conformal blocks
on the torus.

Written by Paul Roux, adapting a Python code written by Sylvain Ribault & Rongvoram
Nivesvivat

===========================================================================================#


"""
Series expansion of four-point blocks on the sphere.
"""
module FourPointBlocksSphere

export FourPointBlockSphere, block

using ..CFTData, ..FourPointCorrelationFunctions
using Match, EllipticFunctions, Memoization
import ..FourPointCorrelationFunctions: permute_ext_fields
import SpecialFunctions: digamma as ψ

#===========================================================================================
Struct FourPointBlockSphere
===========================================================================================#
"""
    FourPointBlockSphere{T}

Composite type that represents the list of arguments of a four-point conformal block:
a channel and a field propagating in the channel. The external fields and central charge are
provided in a `FourPointCorrelation` object.

# Example

```julia-repl
julia> c = CentralCharge("c",0.5); V = Field(c, "δ", 0.6, diagonal = true);
julia> FourPointBlockSphere("s", V)
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

    channel::String
    channelField::Field{T}

end

"""Display blocks"""
function Base.show(io::IO, block::FourPointBlockSphere)
    println("Four-point block")
    println("Channel:\t$(block.channel)")
    println("Channel Field:")
    show(block.channelField)
    # println("External Fields:")
    # print("1. "); show(block.extFields[1])
    # print("2. "); show(block.extFields[2])
    # print("3. "); show(block.extFields[3])
    # print("4. "); show(block.extFields[4])
end

# explicit names for the indices of left and right dimensions
const left = 1
const right = 2

#===========================================================================================
Get t- and u- channel blocks from s-channel block
===========================================================================================#
"""Prefactor to get t- or u-channel blocks from the s-channel block"""
function channelprefactor(block::FourPointBlockSphere, corr::FourPointCorrelation, x)
    @match block.channel begin
        "s" => 1
        "t" => (-1)^(sum(spin(corr.fields)))
        "u" => (-1)^(sum(spin.(corr.fields)))*abs2(x)^(-2*corr.fields[1]["Δ"])
    end
end

"""Cross-ratio at which to evaluate the s-channel block to get t- or u-channel block"""
function crossratio(channel, x)
    @match channel begin
        "s" => x
        "t" => 1-x
        "u" => 1/x
    end
end

#===========================================================================================
Set prefactors, relate the cross-ratio x and the elliptic nome q
===========================================================================================#
"""Nome `q` from the cross-ratio `x`"""
@memoize qfromx(x) = exp(-π*ellipticK(1-x) / ellipticK(x))
"""Cross ratio `x` from the nome `q`"""
xfromq(q) = jtheta2(0,q)^4 / jtheta3(0,q)^4

"""Prefactor for getting the block F from H. The argument `lr` indicates if we are working
with a left or right moving block"""
function blockprefactor(block::FourPointBlockSphere, corr::FourPointCorrelation, x, lr)

    c = corr.charge["c"]
    e0 = - corr.fields[1]["δ"][lr] - corr.fields[2]["δ"][lr] - (c-1)/24
    e1 = - corr.fields[1]["δ"][lr] - corr.fields[4]["δ"][lr] - (c-1)/24
    e2 = sum(corr.fields[i]["δ"][lr] for i in 1:4) + (c-1)/24
    q=qfromx(x)

    return x^e0 * (1-x)^e1 * jtheta3(0,q)^(-4*e2) * (16*q)^block.channelField["δ"][1]
end

"""Degenerate dimensions"""
δrs(r, s, B) = -1/4 * (B*r^2 + 2*r*s + s^2/B)

q(B, r, s) = r/2 + s/(2*B)

"""Factor \ell_{(r,s)} that appears in logarithmic blocks"""
function ell(corr, r, s)
    B = corr.charge["B"]
    b = corr.charge["b"]
    q_ext = [[corr.fields[i]["P"][left]/b for i in 1:4], [corr.fields[i]["P"][right]/b for i in 1:4]]
    term1(j) = ψ(-2q(B, r, j)) + ψ(2q(B, r, -j))
    term2 = big(4)*π/tan(π*big(s)/B)
    term3(lr, pm1, pm2, a, b) = ψ(1/2 - (-1)^ϵ*q(B, r, j) + pm1*q_ext[lr][a] + pm2*q_ext[lr][b])
    return 4*sum(term1(j) for j in 1-s:s) - term2 - \
        sum(term3(lr, pm1, pm2, 1, 2) + term3(lr, pm1, pm2, 3, 4)
                        for lr in (left, right) for pm1 in (-1,1) for pm2 in (-1,1)
                        for j in 1-s:2:s-1)
end

#===========================================================================================
Compute the conformal block
===========================================================================================#
"""
    H(q, Nmax, block, corr, lr, derivative = false)

Compute the function ``H(q,δ)``. If derivative=true, compute instead the function H^{\text{der}}
"""
function H(q, Nmax, block::FourPointBlockSphere, corr::FourPointCorrelation, lr, derivative=false)
    δ = block.channelField["δ"][lr]
    B = corr.charge["B"]
    sq = 16*q
    lsq = log(sq)
    res = derivative ? log(16*q) : 1
    pow = 1
    for N in 1:Nmax

        if derivative
            term = log(16*q)*d
        else
            term = 1
        end

        sum_mn = sum(sum(computeCNmn(N, m, n, corr, block.channel, lr)/(δ-δrs(m, n, B))
                         for n in 1:N if m*n <= N) for m in 1:N)
        pow *= 16*q
        res += pow * sum_mn
    end
    return res
end

"""
    block_chiral_schan(block::FourPointBlockSphere, corr::FourPointCorrelation, x, lr)

Compute the chiral conformal block

``\\mathcal F^{(s)}_{\\delta}(x)``

"""
function block_chiral_schan(x, Nmax, block::FourPointBlockSphere, corr::FourPointCorrelation, lr)
    blockprefactor(block, corr, x, lr) * H(qfromx(x), Nmax, block, corr, lr)
end

"""Compute the chiral conformal block

``\\mathcal F^{(\\text{chan})}_{\\delta}(x)``

where `chan` is `s`, `t`, or `u`."""
function block_chiral(x, Nmax, block::FourPointBlockSphere, corr::FourPointCorrelation, lr)
    chan = block.channel
    block_chiral_schan(crossratio(chan, x), Nmax, block, permute_ext_fields(corr, chan), lr)
end

"""
    G(x, Nmax, block, corr)

Compute the non-chiral conformal block

``\\mathcal F^{(\\text{chan})}_{\\delta}(x) \\overline{\\mathcal F}^{(\\text{chan})}_{\\delta}( \bar x )``

where `chan` is `s`,`t` or `u`.

TODO: logarithmic blocks
"""
function block(x, Nmax, block::FourPointBlockSphere, corr::FourPointCorrelation)
    channelprefactor(block, corr, x) * \
        block_chiral(x, Nmax, block::FourPointBlockSphere, corr::FourPointCorrelation, left) * \
        conj(block_chiral(conj(x), Nmax, block::FourPointBlockSphere, corr::FourPointCorrelation, right))
end

end # end module

"""
Series expansion of one-point blocks on the torus
"""
module OnePointBlocksTorus

using ..CFTData, ..OnePointCorrelationFunctions
import EllipticFunctions: etaDedekind as η

export OnePointBlockTorus, block

#===========================================================================================
Struct containing the data required to compute a block: an external field
===========================================================================================#
struct OnePointBlockTorus{T}
    channelField::Field{T}
end

# explicit names for the indices of left and right dimensions
const left = 1
const right = 2

qfromtau(τ) = exp(2im*big(π)*τ)
δrs(r, s, B) = -1/4 * (B*r^2 + 2*r*s + s^2/B)

#===========================================================================================
Compute the conformal block
===========================================================================================#
"""
    H(q, Nmax, block, corr, leftright)
Compute the function  ``H^{\\text{torus}}(q,δ)``."""
function H(q, Nmax, block::OnePointBlockTorus, corr::OnePointCorrelation, lr)
    δ = block.channelField["δ"][lr]
    B = corr.charge["B"]
    res = 1
    pow = 1
    for N in 1:Nmax
        sum_mn = sum(sum(computeCNmn(N, m, n, corr, lr)/(δ-δrs(m, n, B))
                         for n in 1:N if m*n <= N) for m in 1:N)
        pow *= q
        res += pow * sum_mn
    end
    return res
end

"""
    block_chiral_schan(block::FourPointBlockSphere, corr::FourPointCorrelation, x, lr)

Compute the chiral conformal block

``\\mathcal F^{\text{torus}}_{\\delta}(x)``

"""
function block_chiral(τ, Nmax, block::OnePointBlockTorus, corr::OnePointCorrelation, lr)
    δ = block.channelField["δ"][lr]
    return q^δ/η(τ) * H(qfromtau(τ), Nmax, block, corr, lr)
end

"""
Compute the non-chiral conformal block

`` \\mathcal F_{\\Delta}^{(\\text{chan})}(\\Delta_i| x)``

where ``\\text{chan}`` is `s`,`t` or `u`.

TODO: logarithmic blocks
"""
function F_one_point_torus(τ, Nmax, block::OnePointBlockTorus, corr::OnePointCorrelation)
    block_chiral(τ, Nmax, block, corr, left) * conj(block_chiral(conj(τ), Nmax, block, corr, right))
end

end # end module
