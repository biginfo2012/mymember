const initState = {
    saveFormResponse: null,
    createFormResponse: null,
    uforms: [],
    uform: null,
    uformData: null,
    deleteFormResponse: null,
    setFavouriteFormResponse: null,
    BorderColor:''
}


export const FormBuilderReducer = (state = initState, action) => {

    switch (action.type) {
        case "SAVE_FORM_TITLE_AND_STATUS":
            return { ...state, saveFormResponse: action.payload }
        case "CREATE_FORM":
            return { ...state, createFormResponse: action.payload }
        case "CREATE_FORM_FAIL":
            return { ...state, error: action.payload }
        case "UPDATE_FORM":
            return { ...state }
        case "GET_FUNNEL":
            return { ...state, uforms: action.payload }
        case "GET_TEMPLATE":
            return { ...state, templates: action.payload }
        case "GET_FORMS_FAIL":
            return { ...state, error: action.payload }
        case "GET_FORM":
            return { ...state }
        case "GET_FORM_DATA":
            return { ...state, uformData: action.payload }
        case "GET_FORM_SUCCESS":
            return { ...state, uform: action.payload }
        case "GET_FORM_FAIL":
            return { ...state, error: action.payload }

        case "DELETE_FORM":
            return { ...state, deleteFormResponse: action.payload }
        case "GET_TEMPLATE_CATEGORY_TYPE_LIST":
            return { ...state, templateCategoryTypes: action.payload }
        case "GET_TEMPLATE_CATEGORY_LIST":
            return { ...state, templateCategories: action.payload }

        case "MARK_AS_FAVOURITE_FORM":
            return { ...state, setFavouriteFormResponse: action.payload }

        case "GET_FAVOURITE_FORMS":
            return { ...state, uforms: action.payload }
        case "GET_BORDER_COLOR_FOR_CHECKBOX":
            return { ...state, BorderColor: action.payload }
        case "PROCESS_FORM":
            return { ...state, processFormResponse: action.payload }

        default:
            return state
    }

}
