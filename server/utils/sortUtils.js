
const sortImages = (images, sortBy) => {
    
    if (sortBy === 'id') 
    {
      return images.sort((a, b) => a.id - b.id);
    } else 
    {
      return images;
    }
  };
  
  module.exports = { sortImages };
  