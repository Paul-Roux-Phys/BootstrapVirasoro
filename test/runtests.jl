using JuliVirBootstrap
using Test

@testset "CFTData.jl" begin

    #ensure the relation between b and β does not change
    c1 = CentralCharge("c", -1.1+.2im)
    b = c1["b"]
    c2 = CentralCharge("b", b)
    @test c1["c"] == c2["c"]
    @test c1["β"] == c2["β"]

    #ensure the relation between p and P does not change
    left = 1
    right = 2
    V1 = Field(c1, "P", 0.5, diagonal=true)
    p = V1["p"][left]
    V2 = Field(c1, "p", p, diagonal=true)
    @test V1["P"] == V2["P"]

    #ensure the keyword diagonal also works for fields given from Kac indices
    V1 = Field(c1, Kac=true, r=3, s=4, diagonal=true)
    @test V1["Δ"][left] == V1["Δ"][right]


    #ensure degenerate and diagonal work well together
    V1 = Field(c1, Kac=true, degenerate=true, r=2, s=5, diagonal=true)
    @test V1["Δ"][left] == V1["Δ"][right]

end

@testset "FourPointCorrelationFunctions" begin

    left=1
    right=2

    c = CentralCharge("β", 1.2+.1*1im)
    V1 = Field(c, "Δ", 0.23+.11im, diagonal=true)
    V2 = Field(c, "Δ", 3.43, diagonal=true)
    V3 = Field(c, "Δ", 0.13, diagonal=true)
    V4 = Field(c, "Δ", 1.3, diagonal=true)
    corr = FourPointCorrelation(c, V1, V2, V3, V4)

    @test isapprox(JuliVirBootstrap.FourPointCorrelationFunctions.Rmn(2, 1, corr, "s", left),
                   0.31097697185245077-0.70523695127635733im, # value taken from Sylvain's code
                   atol=1e-8)

    @test isapprox(JuliVirBootstrap.FourPointCorrelationFunctions.Rmn(3, 3, corr, "t", left),
                   4.3964194233662846e-5-1.1534661157146291e-5im, # value taken from Sylvain's code
                   atol=1e-8)

    @test isapprox(JuliVirBootstrap.FourPointCorrelationFunctions.computeCNmn(7, 2, 3, corr, "s", left),
                   0.0019498393368877166+0.0026353877950837049im, # value taken from Sylvain's code
                   atol=1e-8)

end
