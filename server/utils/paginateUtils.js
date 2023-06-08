const paginateImages = (images, page, perPage) => {
    const startIndex = (page - 1) * parseInt(perPage);
    const endIndex = startIndex + parseInt(perPage) ;
    
    if (startIndex >= images.length) 
    {
      return [];
    } 
    else if (endIndex > images.length) 
    {     
      return images.slice(startIndex);
    } 
    else 
    {
      return images.slice(startIndex, endIndex);
    }
  };  


  module.exports = { paginateImages };
  