const labelStatsMap:Map<string, {quizCount?:number, totalScore?:number, color?:string, PrimaryLabelSet?:string}> = new Map;
labelStatsMap.set('Biologia', {color:'#009A56', PrimaryLabelSet:'Biologia'})
labelStatsMap.set('Física', {color:'#FF4770', PrimaryLabelSet:'Física'})
labelStatsMap.set('História', {color:'#97482d', PrimaryLabelSet:'História'})
labelStatsMap.set('Miscelâneo', {color:'#5A48ff', PrimaryLabelSet:'Miscelâneo'})
labelStatsMap.set('Química', {color:'#FF972C', PrimaryLabelSet:'Química'})
export default labelStatsMap;