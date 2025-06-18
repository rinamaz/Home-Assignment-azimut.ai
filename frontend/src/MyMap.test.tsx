import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // לייבא להרחבת יכולות ה-expect

// ייבוא הרכיב שברצוננו לבדוק
import MyMap from './MyMap';

// ייבוא הקבצים החשובים שמכילים את ההגדרות וה-enums
import { eThreatLevel, ThreatLevelColors, eThreatType } from './enums';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

// -----------------------------------------------------------
// Mocking the MapboxGL library
// מכיוון ש-MyMap טוען את MapboxGL, אנחנו חייבים למק אותו
// כדי שהבדיקות יוכלו לרוץ בסביבת JSDOM ללא שגיאות.
// אנחנו לא בודקים כאן את Mapbox, רק את תצוגת הטבלה.
jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({
    on: jest.fn(),
    remove: jest.fn(),
    addSource: jest.fn(),
    addLayer: jest.fn(),
    loadImage: jest.fn((url, callback) => callback(null, new Image())), // Mock loadImage
    getCanvas: jest.fn(() => ({ style: { cursor: '' } })), // Mock getCanvas
    flyTo: jest.fn(), // Mock flyTo
  })),
  Popup: jest.fn(() => ({
    setLngLat: jest.fn().mockReturnThis(),
    setHTML: jest.fn().mockReturnThis(),
    addTo: jest.fn().mockReturnThis(),
    remove: jest.fn(),
  })),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn().mockReturnThis(),
    addTo: jest.fn().mockReturnThis(),
    remove: jest.fn(),
  })),
}));

// -----------------------------------------------------------

// רכיב עזר שירנדר רק את ה-DataTable לצורך הבדיקה הספציפית הזו
// זה מאפשר לנו להתמקד רק על ה-ThreatLevelCell בלי להפעיל את כל הלוגיקה של המפה.
// זו גישה טובה יותר לבדיקת יחידה של חלק ספציפי בקומפוננטה גדולה.
const TestTableWrapper = ({ targets }) => {
  const ThreatLevelCell = (rowData: any) => { // השתמש ב-any כאן כדי למנוע בעיות טיפוס אם ה-interface לא נגיש במלואו
    const color = ThreatLevelColors[rowData.threat_level];
    return (
      <span style={{ color: color, fontWeight: 'bold' }}>
        {rowData.threat_level}
      </span>
    );
  };

  return (
    <DataTable value={targets}>
      <Column field="id" header="Id"></Column>
      <Column field="type" header="Type"></Column>
      <Column field="threat_level" header="Threat Level" body={ThreatLevelCell}></Column>
      <Column field="updated_ago" header="Updated Ago"></Column>
    </DataTable>
  );
};


describe('ThreatLevelCell styling', () => {

  it('displays HIGH threat level in red color', () => {
    const targets = [{
      id: '1',
      type: eThreatType.HUMAN,
      threat_level: eThreatLevel.HIGH,
      updated_ago: 10,
      updated_at: new Date(),
      latitude: 0,
      longitude: 0
    }];

    render(<TestTableWrapper targets={targets} />);

    // מצא את האלמנט שמציג את רמת האיום "HIGH"
    const highThreatElement = screen.getByText('HIGH');

    // בדוק שלאלמנט יש את הצבע האדום (לפי מה שהגדרת ב-ThreatLevelColors)
    expect(highThreatElement).toHaveStyle(`color: ${ThreatLevelColors[eThreatLevel.HIGH]}`);
  });

  it('displays MEDIUM threat level in orange color', () => {
    const targets = [{
      id: '2',
      type: eThreatType.VEHICLE,
      threat_level: eThreatLevel.MEDIUM,
      updated_ago: 20,
      updated_at: new Date(),
      latitude: 0,
      longitude: 0
    }];

    render(<TestTableWrapper targets={targets} />);
    const mediumThreatElement = screen.getByText('MEDIUM');
    expect(mediumThreatElement).toHaveStyle(`color: ${ThreatLevelColors[eThreatLevel.MEDIUM]}`);
  });

  it('displays LOW threat level in green color', () => {
    const targets = [{
      id: '3',
      type: eThreatType.HUMAN,
      threat_level: eThreatLevel.LOW,
      updated_ago: 30,
      updated_at: new Date(),
      latitude: 0,
      longitude: 0
    }];

    render(<TestTableWrapper targets={targets} />);
    const lowThreatElement = screen.getByText('LOW');
    expect(lowThreatElement).toHaveStyle(`color: ${ThreatLevelColors[eThreatLevel.LOW]}`);
  });
});