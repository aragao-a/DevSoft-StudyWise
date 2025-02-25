const labelStatsMap:Map<string, {quizCount?:number, totalScore?:number, color?:string}> = new Map;
labelStatsMap.set('Biologia', {color:'#009A56'})
labelStatsMap.set('Física', {color:'#FF4770'})
labelStatsMap.set('História', {color:'#97482d'})
labelStatsMap.set('Miscelâneo', {color:'#5A48ff'})
labelStatsMap.set('Química', {color:'#FF972C'})
export default labelStatsMap;