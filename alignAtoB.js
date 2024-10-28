module.exports = async (A, B) => {
    
    
    
    const targetCenterX = (B.bounds.right + B.bounds.left) / 2;
    const targetCenterY = (B.bounds.bottom + B.bounds.top) / 2;
    
    const decoCenterX = (A.bounds.right + A.bounds.left) / 2;
    const decoCenterY = (A.bounds.bottom + A.bounds.top) / 2;
    
    offsetX = targetCenterX - decoCenterX;
    offsetY = targetCenterY - decoCenterY;
    
    await A.translate(offsetX, offsetY);
}