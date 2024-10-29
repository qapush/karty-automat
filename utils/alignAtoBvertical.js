module.exports = async (A, B) => {
    
    
    
    const BCenterY = (B.bounds.bottom + B.bounds.top) / 2;
    const ACenterY = (A.bounds.bottom + A.bounds.top) / 2;

    
    offsetY = BCenterY - ACenterY;
    
    await A.translate(0, offsetY);
}