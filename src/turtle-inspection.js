// Bound untrusted sandbox messages before exposing them to host UI.
export function inspectionState(value) {
 if(!value || ![value.x,value.y,value.angleDeg,value.lineWidth].every(Number.isFinite) || value.lineWidth<=0 || typeof value.pen!=="boolean" || typeof value.visible!=="boolean" || typeof value.penColor!=="string" || value.penColor.length>128 || !Number.isInteger(value.stampCount) || value.stampCount<0 || value.stampCount>1000)return null;
 return {x:value.x,y:value.y,angleDeg:value.angleDeg,pen:value.pen,visible:value.visible,penColor:value.penColor,lineWidth:value.lineWidth,stampCount:value.stampCount};
}
export function inspectionStep(value) {
 const before=inspectionState(value?.before),after=inspectionState(value?.after);
 const keys=["stroke","fill","text","clear","stamp","removeStamp"];
 if(!before || !after || !keys.every(key=>Number.isInteger(value.effects?.[key]) && value.effects[key]>=0 && value.effects[key]<=100000))return null;
 return {before,after,effects:Object.fromEntries(keys.map(key=>[key,value.effects[key]]))};
}
