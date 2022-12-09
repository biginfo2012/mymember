const initState = {
    memberStatistic: [],
    incomeStatistic: [],
    rankStatistic: [],
    retentionStatistic: [],
};

export const adminDashboardReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_MEMBER_STATISTICS":
            return { ...state, memberStatistic: action.payload };
        case "GET_INCOME_STATISTICS":
            return { ...state, incomeStatistic: action.payload };
        case "GET_RANK_STATISTICS":
            return { ...state, rankStatistic: action.payload };
        case "GET_RETENTION_STATISTICS":
            return { ...state, retentionStatistic: action.payload };
        default:
            return state;
    }
};