module.exports = async (A, B) => {
    
    
    
    const BCenterX = (B.bounds.right + B.bounds.left) / 2;
    const ACenterX = (A.bounds.right + A.bounds.left) / 2;

    
    offsetX = BCenterX - ACenterX;
    
    await A.translate(offsetX, 0);
}