import React, { useState } from 'react';
import { MobilePhoneList } from './MobilePhoneList';
import { MobilePhoneDetails } from './MobilePhoneDetails';

export function MobilePhonesHub() {
  const [selectedPhone, setSelectedPhone] = useState(null);

  return (
    <>
      {selectedPhone ? (
        <MobilePhoneDetails phone={selectedPhone} onClose={() => setSelectedPhone(null)} />
      ) : (
        <MobilePhoneList onSelectPhone={setSelectedPhone} />
      )}
    </>
  );
}
