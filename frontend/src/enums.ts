 
 export enum eThreatLevel {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  UNKNOWN = 'UNKNOWN', 
}
export const ThreatLevelColors: Record<eThreatLevel, string> = {
  [eThreatLevel.HIGH]: 'red',
  [eThreatLevel.MEDIUM]: 'orange',
  [eThreatLevel.LOW]: 'green',
  [eThreatLevel.UNKNOWN]: 'gray',
};
 export enum eThreatType {
 PERSON= 'PERSON', 
  VESSEL= 'VESSEL',
  AIRCRAFT='AIRCRAFT', 
  ANIMAL= 'ANIMAL', 
  UNKNOWN= 'UNKNOWN', 
}