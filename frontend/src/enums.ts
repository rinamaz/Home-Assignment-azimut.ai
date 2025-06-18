 
 export enum eThreatLevel {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  UNKNOWN = 'UNKNOWN', 
}
export const ThreatLevelColors: Record<eThreatLevel, string> = {
  [eThreatLevel.HIGH]: 'rgb(255, 0, 0)',   
  [eThreatLevel.MEDIUM]: 'rgb(255, 165, 0)', 
  [eThreatLevel.LOW]: 'rgb(0, 128, 0)',  
  [eThreatLevel.UNKNOWN]: 'rgb(128, 128, 128)', 
};
 export enum eThreatType {
 PERSON= 'PERSON', 
  VESSEL= 'VESSEL',
  AIRCRAFT='AIRCRAFT', 
  ANIMAL= 'ANIMAL', 
  UNKNOWN= 'UNKNOWN', 
}