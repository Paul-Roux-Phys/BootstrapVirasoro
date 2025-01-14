"""Nome `q` from the cross-ratio `x`"""
qfromx(x) = exp(-oftype(x, π) * ellipticK(1 - x) / ellipticK(x))

"""Cross ratio `x` from the nome `q`"""
xfromq(q) = jtheta2(0,q)^4 / jtheta3(0,q)^4

#===========================================================================================
Get t- and u- channel blocks from s-channel block
===========================================================================================#
"""
    channelprefactor_chiral(d::FourDimensions, b, x)

Prefactor to get t- or u-channel blocks from the s-channel block
"""
function channelprefactor_chiral(d::FourDimensions, b, x)
    b.channel === :u && return x^(2*d[1].Δ)
    return 1
end

"""Sign (-1)^{S_1+S_2+S_3+S_4} when changing from s to t or u channels"""
function channel_sign(b::Block, x)
    b.channel === :s && return 1
    return 1 # (-1)^(sum(spin.(corr.fields)))
end

"""Cross-ratio at which to evaluate the s-channel block to get t- or u-channel block"""
function crossratio(chan, x)
    chan === :s && return x
    chan === :t && return 1-x
    chan === :u && return 1/x
    error(
        """Incorrect channel specification in crossratio(channel, x):
        must be in $channels"""
    )
end

#===========================================================================================
Block prefactor
===========================================================================================#
"""
    blockprefactor_chiral(d::FourDimensions, b::BlockChiral, x)

Prefactor for getting the chiral block F from H. 
The argument `lr` indicates if we are working with a left or right moving block
"""
function blockprefactor_chiral(d::FourDimensions, b::BlockChiral, x)
    ds = permute_dimensions(d, b.channel)

    a = (d[1].c.c-1)/24
    e0 = -ds[1].δ - ds[2].δ - a
    e1 = -ds[1].δ - ds[4].δ - a
    e2 = sum(ds[i].δ for i in 1:4) + a
    q = qfromx(x)
    
    return channelprefactor_chiral(d, b, x) *
           x^e0 * (1 - x)^e1 * jtheta3(0, q)^(-4 * e2) * (16 * q)^b.channel_dimension.δ
end
