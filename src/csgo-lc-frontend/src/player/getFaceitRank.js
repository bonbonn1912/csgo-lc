export const getFaceitRank = (elo) =>{
    let baseElo = elo - 800;
    let baseLevel = 1
    if(baseElo <= 0){
        return baseLevel
    }else{
        let level = (baseElo-1)/150
        if(level >= 8){
            return 10
        }else{
            return Math.floor(level) + 2
        }
    }
}