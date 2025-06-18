import { render, screen } from '@testing-library/react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { eThreatLevel, ThreatLevelColors, eThreatType } from './enums'; 
import '@testing-library/jest-dom';

interface target {
  id: string;
  type: eThreatType;
  threat_level: eThreatLevel;
  updated_ago: number;
  updated_at: Date;
  latitude: number;
  longitude: number;
}
const ThreatLevelCell = (rowData: target) => {
  const color = ThreatLevelColors[rowData.threat_level];
  return (
    <span style={{ color: color, fontWeight: 'bold' }}>
      {rowData.threat_level}
    </span>
  );
};

describe('ThreatLevelCell', () => {
  it('should display correct color for HIGH threat level', () => {
    const mockTarget: target = {
      id: '1',
      type: eThreatType.AIRCRAFT, 
      threat_level: eThreatLevel.HIGH,
      updated_ago: 10,
      updated_at: new Date(),
      latitude: 0,
      longitude: 0,
    };

    render(
      <DataTable value={[mockTarget]}>
        <Column field="threat_level" header="Threat Level" body={ThreatLevelCell}></Column>
      </DataTable>
    );

    const threatLevelElement = screen.getByText(eThreatLevel.HIGH);
    expect(threatLevelElement).toHaveStyle(`color: ${ThreatLevelColors[eThreatLevel.HIGH]}`);
  });

  it('should display correct color for MEDIUM threat level', () => {
    const mockTarget: target = {
      id: '2',
      type: eThreatType.ANIMAL, 
      threat_level: eThreatLevel.MEDIUM,
      updated_ago: 20,
      updated_at: new Date(),
      latitude: 0,
      longitude: 0,
    };

    render(
      <DataTable value={[mockTarget]}>
        <Column field="threat_level" header="Threat Level" body={ThreatLevelCell}></Column>
      </DataTable>
    );

    const threatLevelElement = screen.getByText(eThreatLevel.MEDIUM);
    expect(threatLevelElement).toHaveStyle(`color: ${ThreatLevelColors[eThreatLevel.MEDIUM]}`);
  });

  it('should display correct color for LOW threat level', () => {
    const mockTarget: target = {
      id: '3',
      type: eThreatType.UNKNOWN, 
      threat_level: eThreatLevel.LOW,
      updated_ago: 30,
      updated_at: new Date(),
      latitude: 0,
      longitude: 0,
    };

    render(
      <DataTable value={[mockTarget]}>
        <Column field="threat_level" header="Threat Level" body={ThreatLevelCell}></Column>
      </DataTable>
    );

    const threatLevelElement = screen.getByText(eThreatLevel.LOW);
    expect(threatLevelElement).toHaveStyle(`color: ${ThreatLevelColors[eThreatLevel.LOW]}`);
  });
});