struct BlockChiral{T} <: Block{T}

    corr::Correlation{T}
    channel::Symbol
    channel_dimension::ConformalDimension{T}
    Nmax::Int
    lr::Symbol # indicates whether the block is left- or right-moving
    _coefficients::Vector{T}
    _coefficients_der::Vector{T}

end

function BlockChiral(
    corr::Correlation,
    chan::Symbol,
    d::ConformalDimension{T},
    lr,
    Nmax::Int;
    der=false
) where {T}
    CNmn = corr._CNmn[chan][lr]
    coeffs = series_H(d, Nmax, CNmn, false)
    coeffs_der = Vector{T}()
    if der
        coeffs_der = series_H(d, Nmax, CNmn, true)
    end

    BlockChiral{T}(corr, chan, d, Nmax, lr, coeffs, coeffs_der)
end

BlockChiral(corr, chan, V::Field, lr, Nmax, der=false) = 
    BlockChiral(corr, chan, V.dims[lr], lr, Nmax, der=der)

BlockChiral(corr, chan, V::Field, lr; der=false) = 
    BlockChiral(corr, chan, V.dims[lr], lr, corr.Nmax, der=der)

function Base.getproperty(b::BlockChiral, s::Symbol)
    s in (:_Rmn, :_CNmn) && return getfield(b.corr, s)[b.channel][b.lr]
    s in (:c, :fields) && return getproperty(b.corr, s)
    return getfield(b, s)
end

"""Compute the Nmax in the Zamolodchikov series such that `d + d_(r,s)`
is less than dmax for all rs <= Nmax"""
function Nmax(d::ConformalDimension, dmax::ConformalDimension)::Int
    β = abs(d.c.β)
    ceil(Int, sqrt(abs(dmax.δ-d.δ)) * min(β, inv(β)))
end

function series_H_N(N, d::ConformalDimension, CNmn, der=false)
    B = d.c.B
    (N == 0 && !der) && return 1
    (N == 0 &&  der) && return 0
    P = d.P
    ind = [(m, n) for m in 1:N for n in 1:N if (N, m, n) in keys(CNmn)]
    isempty(ind) && return 0
    function coeff(m, n)
        # for the derivative series
        der && return -2P / (P^2 - δrs(m, n, B))^2
        # for the regularised series
        d.isKac && (m, n) == (d.r, d.s) && return -inv(4*δrs(d.r, d.s, B))
        # normal series
        return inv(P^2 - δrs(m, n, B))
    end
    return sum(CNmn[(N, m, n)] * coeff(m, n) for (m, n) in ind)
end

function series_H(d::ConformalDimension, Nmax, CNmn, der=false)
    [series_H_N(N, d, CNmn, der) for N in 0:Nmax]
end

struct BlockNonChiral{T} <: Block{T}

    Nmax::Int
    channel_field::Field{T}
    chiral_blocks::LeftRight{BlockChiral{T}}
    chiral_blocks_der::LeftRight{BlockChiral{T}}

end

function BlockNonChiral(
    c::Correlation{T},
    chan::Symbol,
    V::Field{T},
    Nmax::Int
) where {T}
    left, leftder, right, rightder = Tuple(
        BlockChiral(c, chan, V.dims[lr], lr, Nmax, der=der)
        for lr in (:left, :right)
        for der in (false, true)
    )

    BlockNonChiral{T}(Nmax, V, LeftRight((left, right)), LeftRight((leftder, rightder)))
end

BlockNonChiral(c, chan, V) = BlockNonChiral(c, chan, V, c.Nmax)

function Base.getproperty(b::BlockNonChiral, s::Symbol)
    s === :c && return getfield(b.channel_field.dims[:left], s)
    s in (:fields, :corr, :channel) && return getproperty(b.chiral_blocks[:left], s)
    return getfield(b, s)
end

