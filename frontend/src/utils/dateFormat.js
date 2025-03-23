import moment from 'moment'


export const dateFormat = (date) =>{
    return moment(date).format('DD/MM/YYYY')
}

export const monthYearFormat = (date) => {
    return moment(date).format('MM/YYYY');
}

export const YearFormat = (date) => {
    return moment(date).format('YYYY');
}

export const weekFormat = (date) => {
    // Get the start of the week for the given date
    const startOfWeek = moment(date).startOf('week').format('DD/MM/YYYY');
    
    // Get the end of the week for the given date
    const endOfWeek = moment(date).endOf('week').format('DD/MM/YYYY');
    
    return `${startOfWeek} - ${endOfWeek}`;
  };