import axios from 'axios';

export const getAttractions = (lang) => async dispatch => {
  try {
    dispatch({ type: 'ATTRACTIONS_IS_LOADING' });
    const result = await axios.get(`http://192.168.178.16:5000/attractions/${lang}`, {});
    return dispatch({ type: 'DATA_ATTRACTIONS', result });
  } catch (err) {
    return dispatch({
      type: 'DATA_ATTRACTIONS_ERROR',
      err
    });
  }
};

export const getAttraction = (id) => async dispatch => {
  try {
    dispatch({ type: 'SINGLE_ATTRACTION_IS_LOADING' });
    const result = await axios.get(`http://192.168.178.16:5000/attraction/${id}`, {});
    return dispatch({ type: 'SINGLE_ATTRACTION', result });
  } catch (err) {
    return dispatch({ type: 'SINGLE_ATTRACTION_ERROR', err });
  }
}

export function setActiveLanguage(lang) {
  console.log('from actions --- ', lang)
  return { type: "ACTIVE_LANG", lang };
}

