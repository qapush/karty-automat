module.exports = async (A, B) => {
    
    
    
    const BCenterX = (B.bounds.right + B.bounds.left) / 2;
    const BCenterY = (B.bounds.bottom + B.bounds.top) / 2;
    
    const ACenterX = (A.bounds.right + A.bounds.left) / 2;
    const ACenterY = (A.bounds.bottom + A.bounds.top) / 2;
    
    offsetX = BCenterX - ACenterX;
    offsetY = BCenterY - ACenterY;
    
    await A.translate(offsetX, offsetY);
}