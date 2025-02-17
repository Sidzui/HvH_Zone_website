import React from 'react';
import CaseTemplate from './CaseTemplate';

const rewards = {
  balance: [
    { type: 'balance', amount: 1, probability: 20 },
    { type: 'balance', amount: 5, probability: 20 },
    { type: 'balance', amount: 10, probability: 15 },
    { type: 'balance', amount: 50, probability: 15 },
    { type: 'balance', amount: 100, probability: 15 },
    { type: 'balance', amount: 500, probability: 15 }
  ],
  models: [],
  vip: []
};

function SpringCasePage() {
  return (
    <CaseTemplate
      title="WinterCase"
      price={15}
      rewards={rewards}
      backgroundSymbol="❄"
    />
  );
}

export default SpringCasePage;
