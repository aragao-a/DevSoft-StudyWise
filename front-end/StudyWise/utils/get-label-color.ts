import labelStatsMap from "@/constants/labels-stats-map";
const getLabelColor = (label: string) => {
    if(labelStatsMap.has(label)) {
        return labelStatsMap.get(label)?.color
    }
    else {
        return '#5A48ff'
    }
};

export default getLabelColor