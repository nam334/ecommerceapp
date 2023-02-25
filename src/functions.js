export const mergeArrays = (arr1 = [], arr2 = []) => {
    let res = [];
    res = arr1.map(obj => {
       const index = arr2.findIndex(el => el["id"] === obj["id"]);
       const { discountRate} = index !== -1 ? arr2[index] : {};
       return {
          ...obj,
          discountRate
       };
    });
    return res;
 };

 export const discountCalculation = (price, discountRate) => {
    let calculatedPrice =  price - ((discountRate/100)*price)
    return calculatedPrice.toFixed(2)

 }