const eThreatLevel = {
    HIGH: 'HIGH',
    MEDIUM: 'MEDIUM',
    LOW: 'LOW',
    UNKNOWN: 'UNKNOWN',
}

const eThreatType = {
    PERSON: 'PERSON',
    VESSEL: 'VESSEL',
    AIRCRAFT: 'AIRCRAFT',
    ANIMAL: 'ANIMAL',
    UNKNOWN: 'UNKNOWN',
}
const minLatitude = 29.0;
const maxLatitude = 33.5;
const minLongitude = 34.0;
const maxLongitude = 36.0;

export let targets = [];

const getRandomThreatLevel = () => {
    const levels = Object.values(eThreatLevel);
    return levels[Math.floor(Math.random() * levels.length)];
};

const getRandomEntityType = () => {
    const types = Object.values(eThreatType);
    return types[Math.floor(Math.random() * types.length)];
};

const initializeTargets = () => {
    for (let i = 1; i <= 25; i++) {
        targets.push({
            id: i.toString(),
            type: getRandomEntityType(),
            threat_level: getRandomThreatLevel(),
            updated_at: new Date(),
            updated_ago: 0,
            latitude: (Math.random() * (maxLatitude - minLatitude) + minLatitude).toFixed(3),
            longitude: (Math.random() * (maxLongitude - minLongitude) + minLongitude).toFixed(3)
        });
    }
};

initializeTargets();

