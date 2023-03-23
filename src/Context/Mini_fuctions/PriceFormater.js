export const currency = (number)=>{
    return new Intl.NumberFormat('en-IN', {style: 'currency',currency: 'INR', minimumFractionDigits: 2}).format(number);
};