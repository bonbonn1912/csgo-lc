const sort = (arr) =>{
    let sorted = arr.sort((a, b) =>{
        return b.faceit_elo - a. faceit_elo
     })

     return sorted
}

module.exports = sort