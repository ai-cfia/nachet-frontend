export const DrawBBox = (ctx : any, predictions : any) => {
    if (predictions.length > 1){
        predictions.forEach((prediction : any) => {
            const [x, y, width, height] = prediction["bbox"];
            const text = prediction["class"];
            ctx.strokeStyle = "#00FFFF";
            ctx.font = "18px Arial";
            ctx.fillStyle = "#00FFFF";
            ctx.beginPath();
            ctx.fillText(text, x, y);
            ctx.rect(x, y, width, height);
            ctx.stroke();
        });
    }
}