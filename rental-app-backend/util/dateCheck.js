const isDateBetween = (startDate1, endDate1, startDate2, endDate2) => {

    return (startDate2 >= startDate1 && startDate2 <= endDate1) || (endDate2 >= startDate1 && endDate2 <= endDate1)
}

exports.isDateBetween = isDateBetween