import labelStatsMap from "@/constants/labels-stats-map";
const getLabelColor = (label: string) => {
    if(labelStatsMap.has(label)) {
        const labelStats = labelStatsMap.get(label)
        if(labelStats !== undefined && labelStats.color) {
            return labelStats.color
        }
    }
    return '#5A48ff'
};

export default getLabelColor